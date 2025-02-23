import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  daisyui: {
    themes: [
      {
        irisWhite: {
          primary: "#0C326F",

          secondary: "#14315E",

          accent: "#6b7280",

          neutral: "#303030",

          "base-100": "#ffffff",

          info: "#e0e0e0",

          success: "#168821",

          warning: "#ffcd07",

          error: "#e52207",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik Mono One", "sans-serif"],
      },
      boxShadow: {
        'no-blur-lg': '0 8px 0 rgba(0, 0, 0, 0.25)', 
        'no-blur-sm': '0 4px 0 rgba(0, 0, 0, 0.25)', 
      },
    },
  },
  plugins: [typography, daisyui],
};
