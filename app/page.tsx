import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <NeonGradientCard className="mt-20">
        <TextAnimate
          className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
          animation="blurInUp"
          by="character"
          once
        >
          FireBase Auth App!
        </TextAnimate>
      </NeonGradientCard>
    </div>
  );
}
