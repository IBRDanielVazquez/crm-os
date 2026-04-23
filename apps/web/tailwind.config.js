/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        card: "#09090b",
        "card-foreground": "#fafafa",
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        secondary: "#27272a",
        muted: "#27272a",
        border: "#27272a",
        accent: "#3b82f6",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}
