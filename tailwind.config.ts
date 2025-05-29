import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brown-600": "#92400e",
      },
    },
  },
  plugins: [],
} satisfies Config;
