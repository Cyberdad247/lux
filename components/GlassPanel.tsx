"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassPanel({ children, className, delay = 0 }: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay }}
    >
      {children}
    </motion.div>
  );
}
