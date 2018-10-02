
declare module '@elastic/eui' {
  export const VISUALIZATION_COLORS: string[];

  export const DEFAULT_VISUALIZATION_COLOR: string;

  type rgbDef = [number, number, number];

  export const hexToRbg: (hex: string) => rgbDef;
  export const rgbToHex: (rgb: string) => string;

  export const isColorDark: (red: number, green: number, blue: number) => boolean;

  export const calculateLuminance: (red: number, green: number, blue: number) => number;
  export const calculateContrast: (rgb1: rgbDef, rgb2: rgbDef) => number;
}
