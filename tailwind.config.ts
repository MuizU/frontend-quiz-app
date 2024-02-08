import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#A729F5",
      darkNavy: "#313E51",
      navy: "#3B4D66",
      greyNavy: "#626C7F",
      skyBlue: "#ABC1E1",
      cloudWhite: "#F4F6FA",
      white: "#FFFFFF",
      emerald: "#26D782",
      rubyRed: "#EE5454",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)"],
      },
    },
  },
  plugins: [],
};
export default config;
