import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Hritik Yadav — Backend + AI/LLM Engineer",
  description:
    "Python backend + AI/LLM engineer — FastAPI, Celery, and multi-agent pipelines that actually run in production.",
  openGraph: {
    title: "Hritik Yadav — Backend + AI/LLM Engineer",
    description:
      "Python backend + AI/LLM engineer — FastAPI, Celery, and multi-agent pipelines that actually run in production.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
