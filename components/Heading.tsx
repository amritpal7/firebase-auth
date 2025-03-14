import { cn } from "@/lib/auth/utils";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import Link from "next/link";

export default function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          "group text-base text-white transition-all ease-in hover:cursor-pointer"
        )}
      >
        <AnimatedShinyText className="flex items-center justify-center px-4 py-1 transition ease-out">
          <Link href="/">
            <h1 className="text-4xl font-bold text-center pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10">
              🔥Firebase Auth
            </h1>
          </Link>
        </AnimatedShinyText>
      </div>
    </div>
  );
}
