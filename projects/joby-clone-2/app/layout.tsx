import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joby Aviation | Electric Air Taxi for Zero-Emission Travel",
  description: "Joby Aviation is developing a revolutionary electric air taxi that will transform how people travel in and around cities.",
  icons: {
    icon: "/meta/favicon.ico",
    apple: "/meta/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
