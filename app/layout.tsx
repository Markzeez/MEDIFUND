import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediFund — Medical Aid Crowdfunding",
  description: "Transparent, blockchain-powered medical crowdfunding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
