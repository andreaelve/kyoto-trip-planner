import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trip planner · Kyoto weekend prototype",
  description: "Chat prototype that answers a trip request with stay, experience and food cards.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
