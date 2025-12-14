// fonts.ts
import {
  Oswald,
  Beth_Ellen,
  Special_Elite,
  Big_Shoulders_Stencil,
} from "next/font/google";

export const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
export const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const body = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const bigShoulders = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});
