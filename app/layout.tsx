import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garrettswink.com"),
  title: {
    default: "Garrett Swink — Digital Communications Strategy",
    template: "%s — Garrett Swink",
  },
  description:
    "Digital communications strategist and developer with 15+ years across B2B, B2C, and public affairs. Story, strategy, and technology working together to build a complete digital experience.",
  openGraph: {
    title: "Garrett Swink — Digital Communications Strategy",
    description:
      "Story, strategy, and technology working together to build a complete digital experience.",
    url: "https://garrettswink.com",
    siteName: "Garrett Swink",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrett Swink — Digital Communications Strategy",
    description:
      "Story, strategy, and technology working together to build a complete digital experience.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}