import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joby Aviation — Skip traffic. Time to fly.",
  description: "Elevate your commute with our all-electric air taxi, soon to be bookable at the tap of a button.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
