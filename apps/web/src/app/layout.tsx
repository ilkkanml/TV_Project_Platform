import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Project Platform",
  description: "Core Media Player Ecosystem platform dashboard."
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
