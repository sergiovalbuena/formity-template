import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Spline_Sans_Mono } from "next/font/google";

import { cn } from "@/utils";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const splineSansMono = Spline_Sans_Mono({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spline-sans-mono",
});

export const metadata: Metadata = {
  title: "Formity",
  description: "Build The Most Powerful Forms, Without The Hassle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        plusJakartaSans.variable,
        splineSansMono.variable,
      )}
    >
      <body className="h-screen min-h-[800px] min-w-[800px] bg-black">
        {children}
      </body>
    </html>
  );
}
