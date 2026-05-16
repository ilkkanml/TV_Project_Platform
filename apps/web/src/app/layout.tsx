import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Project Platform",
  description: "Licensed IPTV Player Platform management dashboard."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
