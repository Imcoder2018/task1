import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hepta Travel - Discover Amazing Tours",
  description: "Book amazing travel tours and experiences around the world with Hepta Travel. Modern MERN stack travel booking platform.",
  keywords: "travel, tours, booking, adventure, vacation, explore",
  authors: [{ name: "Hepta Travel Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
