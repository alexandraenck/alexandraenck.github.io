import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexandra Enck | Multidisciplinary Creative",
  description:
    "Selected graphic design, knitwear, and television work by Alexandra Enck.",
  openGraph: {
    title: "Alexandra Enck | Multidisciplinary Creative",
    description:
      "Selected graphic design, knitwear, and television work by Alexandra Enck.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alexandra Enck | Multidisciplinary Creative",
    description:
      "Selected graphic design, knitwear, and television work by Alexandra Enck.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
