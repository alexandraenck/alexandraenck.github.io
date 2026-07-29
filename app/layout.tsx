import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Alexandra Enck — Multidisciplinary Creative";
const description =
  "Selected illustration, graphic design, knitwear, and television work by Alexandra Enck.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const base = host ? `${protocol}://${host}` : "https://alexandraenck.myportfolio.com";
  const socialImage = new URL("/og.png", base).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 910, alt: "Alexandra Enck portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
