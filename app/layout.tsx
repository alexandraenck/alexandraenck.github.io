import type { Metadata } from "next";
import "./globals.css";
import { PixelTrail } from "./PixelTrail";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexandraenck.github.io"),
  title: "Alexandra Enck | Multidisciplinary Creative",
  description:
    "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.",
  openGraph: {
    title: "Alexandra Enck | Multidisciplinary Creative",
    description:
      "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Alexandra Enck — Illustration, Design, Knitwear, Television",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Enck | Multidisciplinary Creative",
    description:
      "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PixelTrail />
        {children}
      </body>
    </html>
  );
}
