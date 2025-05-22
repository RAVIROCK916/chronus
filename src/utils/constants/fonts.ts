import { Inter, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const helvetica_neue = localFont({
  src: [
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueUltraLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueUltraLightItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueThin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueThinItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-neue-5/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
});

// export const aeonik = localFont({
//     src: [
//         {
//             path: "../../../public/fonts/AeonikPro-Light.woff2",
//             weight: "300",
//         },
//         {
//             path: "../../../public/fonts/AeonikPro-Regular.woff2",
//             weight: "400",
//         },
//         {
//             path: "../../../public/fonts/AeonikPro-Medium.woff2",
//             weight: "500",
//         },
//         {
//             path: "../../../public/fonts/AeonikPro-Bold.woff2",
//             weight: "700",
//         },
//         {
//             path: "../../../public/fonts/AeonikPro-Black.woff2",
//             weight: "900",
//         }
//     ],
//     variable: "--font-aeonik",
// });

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
