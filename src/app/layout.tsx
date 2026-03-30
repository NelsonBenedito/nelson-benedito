import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nelson Benedito | Desenvolvedor Frontend Premium",
  description: "Portfolio de Nelson Benedito, desenvolvedor front-end especializado em interfaces modernas e de alto desempenho.",
  openGraph: {
    title: "Nelson Benedito | Portfolio",
    description: "Modern, fast, and visually unique portfolio. Built with Next.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
