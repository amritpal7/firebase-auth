import React from "react";
AnimatedShinyText;
import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";
import { LogIn, LogOut, User2Icon } from "lucide-react";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
const Header = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="flex items-center gap-2">
          Loading...
          <Loader2 className="animate-spin" />
        </h1>
      </div>
    );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md rounded-xl shadow-md mx-auto max-w-5xl px-6 py-3 h-16 mt-10">
      <nav className="flex items-center justify-between border-b border-background/20">
        <Heading />

        <ul className="flex space-x-6 text-white font-medium">
          <li
            className={cn(
              "group rounded-full text-base text-white transition-all ease-in hover:cursor-pointer dark:border-white/5 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
            )}
          >
            {user && !loading ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <User2Icon className="mr-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </Link>

                <LogOut className="mr-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />

                <AnimatedShinyText className="inline-flex items-center justify-center">
                  <span className="text-2xl" onClick={handleLogout}>
                    Logout
                  </span>
                </AnimatedShinyText>
              </div>
            ) : (
              <Link href="/login">
                <AnimatedShinyText className="inline-flex items-center justify-center">
                  <LogIn className="mr-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  <span className="text-2xl">Login</span>
                </AnimatedShinyText>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
