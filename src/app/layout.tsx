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
            backgroundColor: "#808080",
          }) + ` ${geistSans.variable} ${geistMono.variable}`
        }
      >
        <div
          className={css({
            display: "flex",
            margin: "0 auto",
            width: "100%",
            maxWidth: "430px",
            height: "1000px",
            backgroundColor: "#ffffff",
            flexDirection: "column",
            overflowY: "auto",
          })}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
