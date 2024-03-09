import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        jumpInfinite: {
          " 0%,100%": {
            "margin-top": "0px",
          },
          "50%": {
            "margin-top": "30px",
          },
          // "100%": {
          //   "margin-top": "0px",
          // },
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        slidein: {
          from: {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },

      animation: {
        jumpInfinite: " jumpInfinite 2s ease-in-out infinite",
        text: "text 3s ease infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        slidein: "slidein 3s ease-in-out 200ms",
      },
      backgroundImage: {
        "logo-bg": "url('/assets/bg.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
