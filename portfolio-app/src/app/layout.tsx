import type { Metadata } from "next";
import { Orbitron, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });

export const metadata: Metadata = {
  title: "Deepak | Spider-Man Portfolio",
  description: "With great power comes great responsibility",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} ${bebas.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
