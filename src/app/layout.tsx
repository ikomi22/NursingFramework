import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "NHS Nursing Competency Framework",
  description: "Competency-based learning, compliance tracking, and role-based training for nursing staff.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-[#212b32] text-white mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 text-sm text-[#768692]">
            NHS Nursing Competency Framework &mdash; Competency-based learning management system
          </div>
        </footer>
      </body>
    </html>
  );
}
