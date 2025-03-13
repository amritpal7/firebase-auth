import type { Metadata } from "next";
import { Andika } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "@/components/ui/sonner";
const andika = Andika({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next firebase auth",
  description: "Next auth with firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${andika.className} relative bg-background font-sans antialiased max-w-2xl mx-auto px-2`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
