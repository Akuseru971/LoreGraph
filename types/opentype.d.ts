declare module "opentype.js" {
  export interface Font {
    charToGlyph(char: string): Glyph;
    getAdvanceWidth(char: string, fontSize: number): number;
  }
  export interface Glyph {
    name: string;
    advanceWidth?: number;
    getPath(x: number, y: number, fontSize: number): Path;
  }
  export interface Path {
    commands: Array<Record<string, number | string>>;
  }
  export function parse(buffer: ArrayBuffer | Buffer): Font;
}
