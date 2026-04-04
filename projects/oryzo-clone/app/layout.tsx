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
  title: "ORYZO — Made for mugs. Built for tables.",
  description: "The world's most unnecessarily sophisticated cork coaster. Designed by Lusion, the award-winning design studio.",
  icons: {
    icon: [
      { url: "/meta/favicon.svg", type: "image/svg+xml" },
      { url: "/meta/favicon-96x96.png", sizes: "96x96" },
    ],
    apple: "/meta/apple-touch-icon.png",
    shortcut: "/meta/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
