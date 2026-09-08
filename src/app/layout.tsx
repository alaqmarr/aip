import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Alfa Industrial Products",
  description: "A decade of expertise and commitment to industrial quality. Leading supplier of industrial components.",
  keywords: "industrial products, industrial components, Alfa Industrial Products, manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
