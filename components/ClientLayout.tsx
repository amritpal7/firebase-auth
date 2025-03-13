// components/ClientLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/app/context/AuthProvider";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import Header from "./Header";
import DockDemo from "./Dock";
import useAuth from "@/app/hooks/useAuth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Particles
          className="fixed inset-0 -z-10"
          quantity={1000}
          ease={80}
          color={color}
          refresh
        />
        <Header />
        <main className="relative max-w-2xl mx-auto px-2">{children}</main>
        <DockDemo />
      </AuthProvider>
    </ThemeProvider>
  );
}
