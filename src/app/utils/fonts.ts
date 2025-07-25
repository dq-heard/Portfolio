// fonts.ts
import {
  Oswald,
  Beth_Ellen,
  Sedgwick_Ave,
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
export const sedgwick = Sedgwick_Ave({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const bigShoulders = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});
