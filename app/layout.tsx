import type { Metadata } from "next";
import "./globals.css";
import { PixelTrail } from "./PixelTrail";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexandraenck.github.io"),
  title: "Alexandra Enck | Multidisciplinary Creative",
  description:
    "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.",
  applicationName: "Alexandra Enck Portfolio",
  authors: [{ name: "Alexandra Enck", url: "https://alexandraenck.github.io" }],
  creator: "Alexandra Enck",
  publisher: "Alexandra Enck",
  keywords: [
    "Alexandra Enck",
    "illustrator",
    "graphic designer",
    "knitwear designer",
    "television creative",
    "creative portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Alexandra Enck | Multidisciplinary Creative",
    description:
      "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.",
    type: "website",
    url: "/",
    siteName: "Alexandra Enck Portfolio",
    locale: "en_US",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexandra Enck",
    url: "https://alexandraenck.github.io",
    image: "https://alexandraenck.github.io/og.png",
    jobTitle: "Multidisciplinary Creative",
    knowsAbout: [
      "Illustration",
      "Graphic Design",
      "Knitwear Design",
      "Television",
    ],
    sameAs: ["https://alexandraenck.myportfolio.com"],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <PixelTrail />
        {children}
      </body>
    </html>
  );
}
