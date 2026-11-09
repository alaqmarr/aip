import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071936",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Pneumatics, Brass & SS Fittings, Valves & Hydraulics in Secunderabad`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Alfa Industrial Products",
    "Alfa Industrial Products Ranigunj",
    "pneumatic products Secunderabad",
    "FRL combinations Hyderabad",
    "brass and SS fittings Ranigunj",
    "PU connectors Telangana",
    "industrial valves Secunderabad",
    "hydraulic couplers Hyderabad",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Pneumatics, Brass & SS Fittings, Valves & Hydraulics`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero-industrial.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} in Ranigunj, Secunderabad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Pneumatics, Brass & SS Fittings, Valves & Hydraulics`,
    description: DEFAULT_DESCRIPTION,
    images: ["/hero-industrial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-brand-surface text-brand-navy">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#071936",
              color: "#ffffff",
              border: "1px solid #1c3d6e",
              fontFamily: "var(--font-ibm-sans)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
