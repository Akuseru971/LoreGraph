"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-eyebrow text-gold">Something broke</p>
      <h1 className="text-monument mt-4 text-4xl">The graph flickered.</h1>
      <p className="text-muted mt-4 text-sm leading-relaxed">
        A temporary fault interrupted this view. Your local progress is still
        safe — try again.
      </p>
      <Button variant="primary" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
