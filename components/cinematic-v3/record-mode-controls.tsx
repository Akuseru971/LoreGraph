"use client";

export function RecordModeControls({
  active,
  paused,
  onStart,
  onRestart,
  onPause,
  onExit,
  showTitles,
  showNarrative,
  showWatermark,
  onToggleTitles,
  onToggleNarrative,
  onToggleWatermark,
}: {
  active: boolean;
  paused: boolean;
  onStart: () => void;
  onRestart: () => void;
  onPause: () => void;
  onExit: () => void;
  showTitles: boolean;
  showNarrative: boolean;
  showWatermark: boolean;
  onToggleTitles: () => void;
  onToggleNarrative: () => void;
  onToggleWatermark: () => void;
}) {
  if (active) return null;

  return (
    <div className="pointer-events-auto absolute top-4 right-4 z-[130] flex flex-col gap-2 rounded border border-line/40 bg-ink/90 p-3 text-xs">
      <div className="text-gold text-[10px] uppercase tracking-widest">Record Mode</div>
      <button
        type="button"
        className="rounded border border-gold/50 px-3 py-1.5 text-gold"
        onClick={onStart}
      >
        Start Recording Mode
      </button>
      <button type="button" className="rounded border border-line px-3 py-1.5" onClick={onRestart}>
        Restart
      </button>
      <button type="button" className="rounded border border-line px-3 py-1.5" onClick={onPause}>
        {paused ? "Resume" : "Pause"}
      </button>
      <button type="button" className="rounded border border-line px-3 py-1.5" onClick={onExit}>
        Exit
      </button>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showTitles} onChange={onToggleTitles} />
        Show titles
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showNarrative} onChange={onToggleNarrative} />
        Show narrative
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showWatermark} onChange={onToggleWatermark} />
        Watermark
      </label>
    </div>
  );
}
