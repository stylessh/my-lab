"use client";

import { motion } from "motion/react";
import type { Lab } from "../(lab)";
import Image from "next/image";

export function Thumbnail({ lab, delay }: { lab: Lab; delay?: number }) {
  if (!lab?.thumbnail) return null;

  return (
    <motion.div
      className="overflow-hidden relative rounded-lg shadow-complex border-2 border-foreground/10 h-48 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ delay, type: "spring", bounce: 0, duration: 0.4 }}
    >
      <Image
        src={lab.thumbnail}
        alt={lab.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </motion.div>
  );
}
