"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { Resend } from "resend";
import { getServiceRoleClient } from "./supabase";
import { BUSINESS_NAME } from "./site";

/**
 * submitLead — the single lead intake server action.
 *
 * Flow:
 *  1. Validate input server-side (zod) + honeypot + minimal rate guard.
 *  2. Insert into Supabase `leads` using the SERVICE ROLE key (server only).
 *  3. Send a notification email via Resend to LEAD_NOTIFICATION_EMAIL.
 *  4. Redirect to /booking/thank-you?type=...&value=... so the thank-you page
 *     can fire the `generate_lead` dataLayer conversion (event-name keyed).
 *
 * The Supabase service-role key and Resend key are never exposed client-side.
 */

const LeadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email.")
    .max(160)
    .optional()
    .or(z.literal("")),
  service_type: z.enum(["residential", "commercial"]),
  service_detail: z.string().trim().max(120).optional().or(z.literal("")),
  property_type: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  square_footage: z
    .union([z.coerce.number().int().nonnegative().max(10_000_000), z.literal("")])
    .optional(),
  estimated_quote: z
    .union([z.coerce.number().nonnegative().max(10_000_000), z.literal("")])
    .optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  utm_source: z.string().trim().max(120).optional().or(z.literal("")),
  utm_medium: z.string().trim().max(120).optional().or(z.literal("")),
  utm_campaign: z.string().trim().max(120).optional().or(z.literal("")),
  // Honeypot — must be empty. Bots tend to fill every field.
  company: z.string().max(0).optional(),
});

export type LeadFormState = {
  ok: boolean;
  error?: string;
};

function asNumberOrNull(v: number | "" | undefined): number | null {
  return typeof v === "number" ? v : null;
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = LeadSchema.safeParse(raw);

  if (!parsed.success) {
    // Honeypot or validation failure — fail quietly with a generic message.
    if (typeof raw.company === "string" && raw.company.length > 0) {
      return { ok: false, error: "Submission rejected." };
    }
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return { ok: false, error: first };
  }

  const data = parsed.data;
  const leadType = data.service_type;
  const estimated = asNumberOrNull(data.estimated_quote);

  // --- 2. Insert into Supabase (service role) -------------------------------
  try {
    const supabase = getServiceRoleClient();
    const { error } = await supabase.from("leads").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      service_type: data.service_type,
      service_detail: data.service_detail || null,
      property_type: data.property_type || null,
      city: data.city || null,
      square_footage: asNumberOrNull(data.square_footage),
      estimated_quote: estimated,
      message: data.message || null,
      source: "website",
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
    });

    if (error) {
      // The DB spam-defense trigger raises on bot-like names — treat as a soft
      // rejection so we don't leak internals, and don't redirect to thank-you.
      console.error("Lead insert failed:", error.message);
      return {
        ok: false,
        error:
          "We couldn't submit your request. Please double-check your details or call us directly.",
      };
    }
  } catch (err) {
    console.error("Supabase unavailable:", err);
    return {
      ok: false,
      error: "Something went wrong on our end. Please call us and we'll get you scheduled.",
    };
  }

  // --- 3. Notify via Resend (non-fatal if it fails) -------------------------
  await sendLeadNotification(data, estimated).catch((err) =>
    console.error("Resend notification failed:", err)
  );

  // --- 4. Redirect to thank-you with conversion params ----------------------
  const value = estimated ?? 0;
  redirect(`/booking/thank-you?type=${leadType}&value=${value}`);
}

async function sendLeadNotification(
  data: z.infer<typeof LeadSchema>,
  estimated: number | null
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn("Resend not fully configured — skipping lead email.");
    return;
  }

  const resend = new Resend(apiKey);
  const lines = [
    `New ${data.service_type} lead from the website`,
    "",
    `Name:        ${data.full_name}`,
    `Phone:       ${data.phone}`,
    `Email:       ${data.email || "—"}`,
    `Service:     ${data.service_type}${data.service_detail ? ` / ${data.service_detail}` : ""}`,
    `Property:    ${data.property_type || "—"}`,
    `City:        ${data.city || "—"}`,
    `Sq footage:  ${data.square_footage ?? "—"}`,
    `Est. quote:  ${estimated != null ? `$${estimated}` : "—"}`,
    "",
    `Message:`,
    data.message || "—",
    "",
    `UTM:         ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ") || "—"}`,
  ];

  await resend.emails.send({
    from: `${BUSINESS_NAME} <${from}>`,
    to: [to],
    replyTo: data.email || undefined,
    subject: `New ${data.service_type} lead — ${data.full_name}`,
    text: lines.join("\n"),
  });
}
