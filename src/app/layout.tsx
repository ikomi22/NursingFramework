import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "NHS Nursing Competency Framework",
  description: "Competency-based learning, compliance tracking, and role-based training for nursing staff.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <main style={{ flex: 1, padding: "32px 36px", maxWidth: 1200 }}>
            {children}
          </main>
          <footer style={{ padding: "20px 36px", borderTop: "1px solid #eaecef", fontSize: 12, color: "#768692" }}>
            NHS Nursing Competency Framework &mdash; Competency-based learning management system
          </footer>
        </div>
      </body>
    </html>
  );
}
