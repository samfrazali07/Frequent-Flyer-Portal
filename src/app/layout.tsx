import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frequent Flyer Portal — Floor Staff Management",
  description:
    "End-to-End Frequent Flyer digital portal for airline floor staff operations (Ticket ENG-163087).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
