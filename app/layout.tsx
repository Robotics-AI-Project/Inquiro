import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inquiro",
  description: "Inquiro Text-to-SQL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "relative flex h-screen w-screen overflow-hidden overscroll-none",
          )}
        >
          <div className="h-full w-14" />
          <Sidebar />
          <div className="flex w-full flex-col">
            <Header />
            <section className="h-full w-full">{children}</section>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
