import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import tailwindcssForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-spline-sans-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [tailwindcssForms],
};
export default config;
