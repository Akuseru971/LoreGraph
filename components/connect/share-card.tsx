"use client";

import { Check, Download, Link2, Share2 } from "lucide-react";
import * as React from "react";
import { LoreGraphMark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { shareCardBlob, type ShareRatio } from "@/lib/share/card";
import { cn, hexToRgba } from "@/lib/utils";
import type { GraphPath } from "@/types";

const RATIOS: Array<{ id: ShareRatio; label: string; aspect: string }> = [
  { id: "9:16", label: "Story · 9:16", aspect: "9 / 16" },
  { id: "1:1", label: "Post · 1:1", aspect: "1 / 1" },
];

export function ShareCardDialog({
  open,
  onOpenChange,
  path,
  shareUrl,
  accentFrom,
  accentTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  path: GraphPath;
  shareUrl: string;
  accentFrom: string;
  accentTo: string;
}) {
  const [ratio, setRatio] = React.useState<ShareRatio>("9:16");
  const [copied, setCopied] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement | null>(null);

  const from = path.nodes[0];
  const to = path.nodes[path.nodes.length - 1];
  const chain = path.nodes.map((node) => node.name);

  const spec = React.useCallback(
    (which: ShareRatio) => {
      const element = previewRef.current;
      const fonts = element
        ? {
            display:
              getComputedStyle(element).getPropertyValue("--font-display") ||
              "Georgia, serif",
            sans:
              getComputedStyle(element).getPropertyValue("--font-sans") ||
              "system-ui, sans-serif",
            mono:
              getComputedStyle(element).getPropertyValue("--font-mono") ||
              "ui-monospace, monospace",
          }
        : undefined;
      return {
        fromName: from.name,
        toName: to.name,
        chain,
        stepCount: path.length,
        ratio: which,
        accentFrom,
        accentTo,
        fonts,
      };
    },
    [from.name, to.name, chain, path.length, accentFrom, accentTo],
  );

  const filename = `loregraph-${from.slug}-${to.slug}-${ratio.replace(":", "x")}.png`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      track({
        name: "connection_share",
        from: from.slug,
        to: to.slug,
        format: "link",
      });
    } catch {
      setCopied(false);
    }
  };

  const download = async () => {
    setBusy(true);
    const blob = await shareCardBlob(spec(ratio));
    setBusy(false);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    track({
      name: "connection_share",
      from: from.slug,
      to: to.slug,
      format: `download-${ratio}`,
    });
  };

  const nativeShare = async () => {
    setBusy(true);
    const blob = await shareCardBlob(spec(ratio));
    setBusy(false);
    const text = `How are ${from.name} and ${to.name} connected? ${path.length} steps.`;
    const file = blob ? new File([blob], filename, { type: "image/png" }) : null;

    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url: shareUrl });
      } else if (navigator.share) {
        await navigator.share({ title: "LoreGraph", text, url: shareUrl });
      } else {
        await download();
        return;
      }
      track({
        name: "connection_share",
        from: from.slug,
        to: to.slug,
        format: "native",
      });
    } catch {
      // User dismissed the sheet.
    }
  };

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="max-h-[88vh] overflow-y-auto p-5 sm:p-7">
          <DialogTitle className="font-display text-2xl">Share this connection</DialogTitle>
          <p className="text-muted mt-1 text-sm">
            Built for Stories and posts. Download the card or copy the link.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,260px)_1fr]">
            <div className="mx-auto w-full max-w-[260px]">
              <SharePreview
                ref={previewRef}
                ratio={ratio}
                fromName={from.name}
                toName={to.name}
                chain={chain}
                stepCount={path.length}
                accentFrom={accentFrom}
                accentTo={accentTo}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-eyebrow text-muted mb-2">Format</p>
                <div className="flex gap-2">
                  {RATIOS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRatio(option.id)}
                      aria-pressed={ratio === option.id}
                      className={cn(
                        "text-label rounded-full border px-3.5 py-2 transition-colors",
                        ratio === option.id
                          ? "border-gold/50 bg-gold/12 text-gold"
                          : "text-muted hover:text-parchment border-line",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="primary" onClick={download} disabled={busy}>
                  <Download aria-hidden />
                  {busy ? "Rendering…" : "Download card"}
                </Button>
                {canNativeShare ? (
                  <Button variant="secondary" onClick={nativeShare} disabled={busy}>
                    <Share2 aria-hidden />
                    Share
                  </Button>
                ) : null}
                <Button variant="secondary" onClick={copyLink}>
                  {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
                  {copied ? "Link copied" : "Copy link"}
                </Button>
              </div>

              <p className="text-muted-dim text-xs leading-relaxed">
                The link reopens this exact path so anyone can try to beat it.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** On-screen replica of the canvas card. Kept visually in sync with lib/share/card.ts. */
const SharePreview = React.forwardRef<
  HTMLDivElement,
  {
    ratio: ShareRatio;
    fromName: string;
    toName: string;
    chain: string[];
    stepCount: number;
    accentFrom: string;
    accentTo: string;
  }
>(function SharePreview(
  { ratio, fromName, toName, chain, stepCount, accentFrom, accentTo },
  ref,
) {
  const tall = ratio === "9:16";
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        aspectRatio: tall ? "9 / 16" : "1 / 1",
        background: [
          `radial-gradient(90% 60% at 12% 8%, ${hexToRgba(accentFrom, 0.32)} 0%, transparent 70%)`,
          `radial-gradient(90% 60% at 90% 95%, ${hexToRgba(accentTo, 0.28)} 0%, transparent 70%)`,
          "linear-gradient(135deg, #0B0F18 0%, #05070C 100%)",
        ].join(", "),
      }}
    >
      <span
        aria-hidden
        className="absolute inset-[4.5%] rounded-sm border border-gold/20"
      />
      <div
        className={cn(
          "relative flex size-full flex-col items-center px-[9%] text-center",
          tall ? "py-[7%]" : "py-[6%]",
        )}
      >
        <LoreGraphMark className="text-gold/70 size-4" />
        <span className="text-eyebrow text-gold mt-1.5 scale-90">LOREGRAPH</span>

        <div className={cn("flex flex-col items-center", tall ? "mt-[9%]" : "mt-[5%]")}>
          <span className="text-eyebrow text-muted scale-[0.7]">HOW ARE</span>
          <span className="text-monument text-parchment mt-1 text-[clamp(1rem,10cqw,1.6rem)] leading-none">
            {fromName}
          </span>
          <span className="text-eyebrow text-muted mt-1.5 scale-[0.7]">AND</span>
          <span className="text-monument text-parchment mt-1 text-[clamp(1rem,10cqw,1.6rem)] leading-none">
            {toName}
          </span>
          <span className="text-eyebrow text-muted mt-1.5 scale-[0.7]">CONNECTED?</span>
        </div>

        <span aria-hidden className="mt-[5%] h-px w-10 bg-gold/40" />
        <span className="text-eyebrow text-gold mt-[4%] scale-90">
          {stepCount} {stepCount === 1 ? "STEP" : "STEPS"}
        </span>

        <ul className="mt-[5%] flex min-h-0 flex-1 flex-col items-center justify-center gap-[3%]">
          {chain.map((name, index) => (
            <li key={`${name}-${index}`} className="flex flex-col items-center gap-[3px]">
              <span
                aria-hidden
                className={cn(
                  "rounded-full",
                  index === 0 || index === chain.length - 1
                    ? "bg-gold size-[5px]"
                    : "size-[3px] bg-parchment/50",
                )}
              />
              <span
                className={cn(
                  "font-display block text-[0.5rem] leading-none tracking-tight uppercase sm:text-[0.625rem]",
                  index === 0 || index === chain.length - 1
                    ? "text-parchment"
                    : "text-parchment/70",
                )}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>

        <span className="text-muted mt-auto pt-[4%] text-[0.5rem]">loregraph.gg</span>
      </div>
    </div>
  );
});
