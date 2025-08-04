"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SparklesProps {
  children: ReactNode;
  className?: string;
  sparkleCount?: number;
}

export function Sparkles({
  children,
  className,
  sparkleCount = 15,
}: SparklesProps) {
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-yellow-500 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
        />
      ))}
      {children}
    </div>
  );
}
