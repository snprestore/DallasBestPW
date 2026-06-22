import { telHref, BUSINESS_PHONE } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/**
 * Mobile-only floating call button. Fixed to the bottom-right so a tap-to-call
 * is always within thumb reach on phones. Hidden on md+ (the header already
 * surfaces the number on larger screens).
 */
export default function FloatingCallButton() {
  return (
    <a
      href={telHref()}
      aria-label={`Call ${BUSINESS_PHONE}`}
      data-tracking="floating-call"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 md:hidden"
    >
      <PhoneIcon className="h-6 w-6" />
    </a>
  );
}
