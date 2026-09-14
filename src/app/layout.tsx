import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hritik.online"),
  title: "Hritik Yadav | Backend + AI/LLM Engineer",
  description:
    "Portfolio of Hritik Yadav, a Python backend and AI/LLM engineer specializing in FastAPI, Celery, and production-ready multi-agent pipelines.",
  keywords: ["Hritik Yadav", "Backend Engineer", "AI Engineer", "LLM Engineer", "Python", "FastAPI", "Celery", "Multi-agent pipelines", "Developer Portfolio"],
  authors: [{ name: "Hritik Yadav", url: "https://hritik.online" }],
  creator: "Hritik Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hritik.online",
    title: "Hritik Yadav | Backend + AI/LLM Engineer",
    description:
      "Python backend + AI/LLM engineer building FastAPI, Celery, and production-ready multi-agent pipelines.",
    siteName: "Hritik Yadav Portfolio",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Hritik Yadav Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Yadav | Backend + AI/LLM Engineer",
    description:
      "Python backend + AI/LLM engineer building FastAPI, Celery, and production-ready multi-agent pipelines.",
    creator: "@Hritik_Yadav_1",
    images: ["/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
          {children}
          <Script
            src="https://cdn.jsdelivr.net/gh/adryd325/oneko.js@14bab88/oneko.js"
            strategy="afterInteractive"
          />
        </body>
    </html>
  );
}
