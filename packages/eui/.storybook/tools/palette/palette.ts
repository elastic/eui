/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type ColorMap = Record<string, string>;
export type PaletteColor = string | { name: string; value: string };
export type Palette = PaletteColor[];

export interface ResolvedPaletteColor {
  name: string;
  value: string;
}

export const parseColorName = (
  name: string
): { hue: string; shade: number } | null => {
  const match = /^(.*?)(\d+)$/.exec(name);
  return match ? { hue: match[1], shade: Number(match[2]) } : null;
};

const normalize = (value: string) => value.trim().toLowerCase();

const isColorString = (value: unknown): value is string =>
  typeof value === 'string';

export const coercePalette = (palette: unknown): Palette => {
  if (Array.isArray(palette)) return palette.filter(Boolean);
  if (palette == null || typeof palette !== 'object') return [];

  return Object.entries(palette as Record<string, unknown>).map(
    ([name, value]) => {
      if (isColorString(value)) {
        return value.startsWith('#') || value.startsWith('rgb')
          ? { name, value }
          : value;
      }
      if (value && typeof value === 'object' && 'value' in value) {
        return value as { name: string; value: string };
      }
      return name;
    }
  );
};

export const resolvePalette = (
  palette: Palette,
  colors: ColorMap
): ResolvedPaletteColor[] => {
  const namesByValue = new Map(
    Object.entries(colors).flatMap(([name, value]) =>
      isColorString(value) ? [[normalize(value), name] as const] : []
    )
  );

  return coercePalette(palette).flatMap((entry) => {
    if (entry && typeof entry === 'object') {
      return isColorString(entry.value) ? [entry] : [];
    }
    if (!isColorString(entry)) return [];
    if (entry in colors && isColorString(colors[entry])) {
      return [{ name: entry, value: colors[entry] }];
    }

    return [
      { name: namesByValue.get(normalize(entry)) ?? entry, value: entry },
    ];
  });
};
