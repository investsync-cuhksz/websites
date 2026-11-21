import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteSettings } from "@/lib/data";

const cormorant = localFont({
  src: [
    { path: "./fonts/Cormorant-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Cormorant-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Cormorant-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Cormorant-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Cormorant-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "InvestSync · CUHK-Shenzhen", template: "%s · InvestSync" },
  description:
    "InvestSync is the investment & networking organization for students of CUHK-Shenzhen.",
  icons: { icon: "/images/brand/logo-icon.png" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={cormorant.variable}>
      <body className="flex min-h-dvh flex-col">
        <AuthProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter settings={settings} />
        </AuthProvider>
      </body>
    </html>
  );
}