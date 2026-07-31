import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest of Five",
  description: "A responsive level-based quiz game with a surprise unlock.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
