import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlantBrain | Knowledge OS",
  description: "The AI-powered Industrial Knowledge Operating System. Unified Asset & Operations Brain for predictive maintenance, failure analysis, and compliance intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
