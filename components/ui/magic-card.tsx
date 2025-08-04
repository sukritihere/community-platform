"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientColor = "#8B5CF6",
  gradientOpacity = 0.1,
}: MagicCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradientColor}${Math.round(
            gradientOpacity * 255
          ).toString(16)} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}