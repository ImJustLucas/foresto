import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layouts/app-header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FORESTO",
  description:
    "Discover the tranquility and beauty of nature. Escape the hustle and bustle of everyday life and immerse yourself in the serene surroundings of the forest. 🌳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh`}
        style={{ background: "radial-gradient(circle, #ECFDF5, #FFFFFF)" }}
      >
        <AppHeader />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
