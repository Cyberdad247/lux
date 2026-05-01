"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  whileHover?: TargetAndTransition;
}

export default function GlassPanel({ children, className, delay = 0, whileHover }: GlassPanelProps) {
  return (
    <motion.div
      className={cn("glass rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay }}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}
