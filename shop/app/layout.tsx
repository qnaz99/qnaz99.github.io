import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "U Krooze Shop",
  description: "Browse and buy mobility scooters from U Krooze.",
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




