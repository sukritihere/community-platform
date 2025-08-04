"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent animate-pulse",
        "bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]",
        className
      )}
      style={{
        backgroundImage: "linear-gradient(45deg, #8B5CF6, #06B6D4, #10B981, #8B5CF6)",
        backgroundSize: "200% auto",
        animation: "gradient 3s ease infinite",
      }}
    >
      {children}
    </span>
  );
}