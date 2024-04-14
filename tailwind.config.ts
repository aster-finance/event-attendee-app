import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
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
  plugins: [require("daisyui"), addVariablesForColors]
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}