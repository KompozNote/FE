import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { css } from "@/../../styled-system/css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kompoz Note",
  description: "Kompoz Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          css({
            minH: "100vh",
            w: "100%",
            maxW: "430px",
            margin: "0 auto",
            padding: "50px 15px",
            display: "flex",
            flexDirection: "column",
            bg: "white", // 원하는 기본 배경색
          }) + ` ${geistSans.variable} ${geistMono.variable}`
        }
      >
        {children}
      </body>
    </html>
  );
}
