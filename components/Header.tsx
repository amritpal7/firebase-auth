"use client";

import React from "react";
import { cn } from "@/lib/auth/utils";
import Heading from "@/components/Heading";
import { LogIn, LogOut, User2Icon, Loader2 } from "lucide-react";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import { Button } from "./ui/button";

const Header = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="flex items-center gap-2">
          Loading...
          <Loader2 className="animate-spin" />
        </h1>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md rounded-xl shadow-md mx-auto max-w-5xl px-4 sm:px-6 py-3 h-auto mt-6 sm:mt-10">
      <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-background/20">
        {/* Brand/Heading */}
        <div className="w-full sm:w-auto flex justify-between items-center">
          <Heading />
        </div>

        {/* Right Side Actions */}
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-white font-medium">
          <li
            className={cn(
              "group rounded-full text-base text-foreground transition-all ease-in hover:cursor-pointer dark:border-white/5 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
            )}
          >
            {user && !loading ? (
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <User2Icon className="size-5" />
                  <span className="text-sm sm:inline hidden">Profile</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition"
              >
                <AnimatedShinyText className="inline-flex items-center justify-center text-base">
                  Login
                </AnimatedShinyText>
                <LogIn className="size-5" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
