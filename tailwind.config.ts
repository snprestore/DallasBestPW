import type { Config } from "tailwindcss";

/**
 * Dallas Best Pressure Washing — brand theme tokens.
 * Water + power identity: deep navy/blue with an electric-blue accent
 * and safety-orange highlight. Fresh palette, NOT borrowed from any
 * sibling brand. Edit tokens here to retheme the whole site.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: deep water blue
        primary: {
          DEFAULT: "#0B4F8A", // strong blue
          dark: "#06223D", // deep navy
          light: "#1A6FB5",
          foreground: "#FFFFFF",
        },
        // Accent: electric blue (power/water spray)
        accent: {
          DEFAULT: "#19B6E8",
          light: "#5FD0F2",
          dark: "#0E8FBA",
        },
        // Highlight: safety orange (CTAs / energy)
        highlight: {
          DEFAULT: "#FF6A2C",
          light: "#FF8A5C",
          dark: "#E5531A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dim: "#F4F7FA", // cool gray-blue
          dark: "#0A1A2B",
        },
        text: {
          DEFAULT: "#13212E", // near-black blue
          muted: "#516170",
          light: "#E8EEF3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-barlow)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
