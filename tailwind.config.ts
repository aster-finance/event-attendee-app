import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#F4F5F6",
        card: "#FDFDFD",
        text: "#131517",
        subtext: "#A9AAAA"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  purge: {
    content: ["./src/**/*.tsx"],
    options: {
      safelist: [{pattern: /bg-./}, "bg-[#0D3849]"],
    }
  },
  plugins: [require("daisyui")]
} satisfies Config;
