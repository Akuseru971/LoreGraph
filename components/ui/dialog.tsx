"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-ink-deep/80 backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className,
      )}
      style={{ animation: "lg-fade-up 0.2s ease-out" }}
      {...props}
    />
  );
}

/** Centered modal — used by Story Paths and the share card. */
export function DialogContent({
  className,
  children,
  hideClose,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { hideClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "panel fixed top-1/2 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose ? (
          <DialogPrimitive.Close
            aria-label="Close"
            className="text-muted hover:text-parchment absolute top-4 right-4 z-10 rounded-full border border-line bg-ink/60 p-2 transition-colors"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/**
 * Bottom sheet on mobile, right-hand drawer on desktop.
 * Used for the relationship panel and filters.
 */
export function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col border-line bg-surface/95 backdrop-blur-xl focus:outline-none",
          "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl border-t",
          "sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-[440px] sm:rounded-none sm:rounded-l-2xl sm:border-t-0 sm:border-l",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/15 sm:hidden"
        />
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="text-muted hover:text-parchment absolute top-4 right-4 rounded-full border border-line bg-ink/60 p-2 transition-colors max-sm:top-5"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/** Fullscreen overlay — the Story Path player. */
export function FullscreenContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-deep/95 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-hidden bg-ink focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
