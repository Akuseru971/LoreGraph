/**
 * Share card renderer.
 *
 * Draws the Connect result straight onto a canvas so the download is a real
 * image at story resolution, with no screenshot library in the bundle. The
 * on-screen preview in components/connect/share-card.tsx mirrors this layout.
 */

export type ShareRatio = "9:16" | "1:1";

export interface ShareCardSpec {
  fromName: string;
  toName: string;
  /** Every node along the path, endpoints included. */
  chain: string[];
  stepCount: number;
  ratio: ShareRatio;
  accentFrom: string;
  accentTo: string;
  /** Resolved font stacks, read from the live document so the card matches the UI. */
  fonts?: { display: string; sans: string; mono: string };
}

const GOLD = "#C9A96E";
const PARCHMENT = "#F5F2E8";
const MUTED = "#8F9AAD";

export const SHARE_SIZES: Record<ShareRatio, { width: number; height: number }> = {
  "9:16": { width: 1080, height: 1920 },
  "1:1": { width: 1080, height: 1080 },
};

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Shrinks the font until the text fits, then draws it centred. */
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  family: string,
  startSize: number,
  weight = "400",
): number {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number,
) {
  const chars = [...text];
  const width =
    chars.reduce((sum, char) => sum + ctx.measureText(char).width, 0) +
    tracking * (chars.length - 1);
  let x = centerX - width / 2;
  for (const char of chars) {
    ctx.fillText(char, x, y);
    x += ctx.measureText(char).width + tracking;
  }
}

function drawMark(ctx: CanvasRenderingContext2D, centerX: number, y: number, scale: number) {
  const points: Array<[number, number]> = [
    [-10 * scale, 6 * scale],
    [0, -9 * scale],
    [10 * scale, 6 * scale],
  ];
  ctx.strokeStyle = withAlpha(GOLD, 0.55);
  ctx.lineWidth = 1.6 * scale;
  ctx.beginPath();
  ctx.moveTo(centerX + points[0][0], y + points[0][1]);
  ctx.lineTo(centerX + points[1][0], y + points[1][1]);
  ctx.lineTo(centerX + points[2][0], y + points[2][1]);
  ctx.stroke();
  ctx.fillStyle = GOLD;
  for (const [dx, dy] of points) {
    ctx.beginPath();
    ctx.arc(centerX + dx, y + dy, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawShareCard(
  canvas: HTMLCanvasElement,
  spec: ShareCardSpec,
): void {
  const { width, height } = SHARE_SIZES[spec.ratio];
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const display = spec.fonts?.display ?? "Georgia, 'Times New Roman', serif";
  const sans = spec.fonts?.sans ?? "system-ui, sans-serif";
  const mono = spec.fonts?.mono ?? "ui-monospace, monospace";
  const centerX = width / 2;
  const margin = width * 0.1;
  const maxWidth = width - margin * 2;
  const tall = spec.ratio === "9:16";

  /* ------------------------------------------------------------ backdrop */
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#0B0F18");
  base.addColorStop(1, "#05070C");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const glowA = ctx.createRadialGradient(
    width * 0.12,
    height * 0.08,
    0,
    width * 0.12,
    height * 0.08,
    width * 0.95,
  );
  glowA.addColorStop(0, withAlpha(spec.accentFrom, 0.32));
  glowA.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, width, height);

  const glowB = ctx.createRadialGradient(
    width * 0.9,
    height * 0.95,
    0,
    width * 0.9,
    height * 0.95,
    width,
  );
  glowB.addColorStop(0, withAlpha(spec.accentTo, 0.28));
  glowB.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = withAlpha(GOLD, 0.22);
  ctx.lineWidth = 2;
  ctx.strokeRect(margin * 0.45, margin * 0.45, width - margin * 0.9, height - margin * 0.9);

  /* -------------------------------------------------------------- header */
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  let y = tall ? height * 0.115 : height * 0.13;
  drawMark(ctx, centerX, y - 26, tall ? 1.5 : 1.2);

  ctx.fillStyle = GOLD;
  ctx.font = `500 ${tall ? 28 : 24}px ${mono}`;
  drawTracked(ctx, "LOREGRAPH", centerX, y + 34, tall ? 12 : 10);

  /* ------------------------------------------------------------ headline */
  y += tall ? 170 : 120;

  const kicker = (text: string, size: number, gap: number) => {
    ctx.fillStyle = MUTED;
    ctx.font = `400 ${size}px ${mono}`;
    drawTracked(ctx, text, centerX, y, 8);
    y += gap;
  };

  const bigName = (text: string, start: number, gap: number) => {
    const size = fitText(ctx, text.toUpperCase(), maxWidth, display, start);
    ctx.fillStyle = PARCHMENT;
    ctx.textAlign = "center";
    ctx.fillText(text.toUpperCase(), centerX, y);
    ctx.textAlign = "left";
    y += gap * (size / start);
  };

  kicker("HOW ARE", tall ? 30 : 26, tall ? 96 : 76);
  bigName(spec.fromName, tall ? 128 : 104, tall ? 92 : 78);
  kicker("AND", tall ? 30 : 26, tall ? 96 : 76);
  bigName(spec.toName, tall ? 128 : 104, tall ? 84 : 70);
  kicker("CONNECTED?", tall ? 30 : 26, tall ? 74 : 58);

  /* ------------------------------------------------------------ step tag */
  ctx.fillStyle = withAlpha(GOLD, 0.35);
  ctx.fillRect(centerX - 44, y - 10, 88, 1.5);
  y += tall ? 66 : 52;

  ctx.fillStyle = GOLD;
  ctx.font = `500 ${tall ? 34 : 28}px ${mono}`;
  drawTracked(
    ctx,
    `${spec.stepCount} ${spec.stepCount === 1 ? "STEP" : "STEPS"}`,
    centerX,
    y,
    10,
  );

  /* --------------------------------------------------------------- chain */
  const footerY = height - margin * 0.95;
  const chainTop = y + (tall ? 92 : 66);
  const available = footerY - chainTop - (tall ? 90 : 70);
  const slot = Math.min(tall ? 128 : 96, available / Math.max(1, spec.chain.length));
  const nameSize = Math.min(tall ? 46 : 38, slot * 0.42);
  const dotX = centerX;

  spec.chain.forEach((name, index) => {
    const nodeY = chainTop + slot * index + slot / 2;
    const isEnd = index === 0 || index === spec.chain.length - 1;

    if (index < spec.chain.length - 1) {
      const nextY = nodeY + slot;
      ctx.strokeStyle = withAlpha(GOLD, 0.3);
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 10]);
      ctx.beginPath();
      ctx.moveTo(dotX, nodeY + slot * 0.22);
      ctx.lineTo(dotX, nextY - slot * 0.22);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = isEnd ? GOLD : withAlpha(PARCHMENT, 0.5);
    ctx.beginPath();
    ctx.arc(dotX, nodeY - nameSize * 0.32, isEnd ? 9 : 6, 0, Math.PI * 2);
    ctx.fill();

    const size = fitText(
      ctx,
      name.toUpperCase(),
      maxWidth * 0.86,
      display,
      nameSize,
    );
    ctx.fillStyle = isEnd ? PARCHMENT : withAlpha(PARCHMENT, 0.72);
    ctx.font = `400 ${size}px ${display}`;
    ctx.textAlign = "center";
    ctx.fillText(name.toUpperCase(), centerX, nodeY + slot * 0.3);
    ctx.textAlign = "left";
  });

  /* -------------------------------------------------------------- footer */
  ctx.fillStyle = withAlpha(PARCHMENT, 0.45);
  ctx.font = `400 ${tall ? 26 : 22}px ${sans}`;
  ctx.textAlign = "center";
  ctx.fillText("loregraph.gg", centerX, footerY);
  ctx.textAlign = "left";
}

export async function shareCardBlob(spec: ShareCardSpec): Promise<Blob | null> {
  if (typeof document === "undefined") return null;
  if ("fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Fall through with fallback fonts.
    }
  }
  const canvas = document.createElement("canvas");
  drawShareCard(canvas, spec);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}
