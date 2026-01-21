// fonts.ts
import {
  Oswald,
  Beth_Ellen,
  Rubik,
  Big_Shoulders_Stencil,
} from "next/font/google";

export const heading = Oswald({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
export const sig = Beth_Ellen({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const body = Rubik({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});
