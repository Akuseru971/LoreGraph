"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, Plus } from "lucide-react";
import { useProgress } from "@/components/providers";

export function XpToastStack() {
  const { toasts, dismissToast } = useProgress();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6 md:left-auto md:right-6 md:items-end md:px-0"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            type="button"
            onClick={() => dismissToast(toast.id)}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="panel pointer-events-auto flex max-w-xs items-center gap-3 px-4 py-3 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <span className="bg-gold/12 text-gold grid size-8 shrink-0 place-items-center rounded-full">
              {toast.achievement ? (
                <Award className="size-4" aria-hidden />
              ) : (
                <Plus className="size-4" aria-hidden />
              )}
            </span>
            <span className="min-w-0">
              <span className="text-parchment block text-sm font-medium">
                {toast.achievement ? toast.achievement.name : `+${toast.amount} Lore XP`}
              </span>
              <span className="text-muted block truncate text-xs">
                {toast.achievement ? toast.achievement.description : toast.reason}
              </span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
