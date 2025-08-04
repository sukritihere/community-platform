"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = new Array(number).fill(true);
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((_, idx) => (
        <motion.span
          key={idx}
          className={cn(
            "absolute h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2",
            "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 2 + "s",
            animationDuration: Math.random() * 8 + 2 + "s",
          }}
          animate={{
            x: [0, -100],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}