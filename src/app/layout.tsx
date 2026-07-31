import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GameProvider } from "@/context/GameContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = { title: "Fun", description: "A polished level-based game with a personalized surprise finale." };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className="animated-bg"><GameProvider><Header />{children}<Footer /></GameProvider></body></html>;
}
