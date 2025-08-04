"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface FloatingDockProps {
  items: {
    title: string;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
  }[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
        "flex items-center gap-2 p-2 rounded-2xl",
        "bg-background/80 backdrop-blur-md border shadow-lg",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.button
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl",
              "bg-muted/50 hover:bg-primary/10 transition-colors",
              "text-muted-foreground hover:text-primary"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
          >
            {item.icon}
          </motion.button>
          
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-popover text-popover-foreground px-2 py-1 rounded-md text-sm whitespace-nowrap shadow-md">
                  {item.title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}