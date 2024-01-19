import { cn } from "@/client/libs/utils";
import Providers from "@/client/providers";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@client/components/header";
import Sidebar from "@client/components/sidebar";
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
          <Providers>
            <div className="h-full w-14" />
            <Sidebar />
            <div className="flex w-full flex-col">
              <Header />
              <section className="h-full w-full">{children}</section>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
