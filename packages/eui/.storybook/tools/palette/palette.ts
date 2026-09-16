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

export interface PaletteHueGroup {
  hue: string;
  colors: ResolvedPaletteColor[];
}

const hueOf = (name: string) => parseColorName(name)?.hue ?? name;

const shadeOf = (name: string) => parseColorName(name)?.shade ?? 0;

const compareDarkToLight = (a: ResolvedPaletteColor, b: ResolvedPaletteColor) =>
  shadeOf(b.name) - shadeOf(a.name);

export const groupPaletteByHue = (
  palette: Palette,
  colors: ColorMap
): PaletteHueGroup[] => {
  const groups: PaletteHueGroup[] = [];
  const indexByHue = new Map<string, number>();
  const seen = new Set<string>();

  resolvePalette(palette, colors).forEach((color) => {
    if (seen.has(color.name)) return;
    seen.add(color.name);

    const hue = hueOf(color.name);
    const existingIndex = indexByHue.get(hue);
    if (existingIndex == null) {
      indexByHue.set(hue, groups.length);
      groups.push({ hue, colors: [color] });
      return;
    }

    groups[existingIndex].colors.push(color);
  });

  groups.forEach((group) => {
    group.colors.sort(compareDarkToLight);
  });

  return groups;
};

export const flattenHueGroups = (groups: PaletteHueGroup[]): string[] =>
  groups.flatMap((group) => group.colors.map((color) => color.name));

export const normalizePaletteOrder = (
  palette: Palette,
  colors: ColorMap
): string[] => flattenHueGroups(groupPaletteByHue(palette, colors));

export const togglePaletteColor = (
  palette: Palette,
  name: string,
  colors: ColorMap
): string[] => {
  const groups = groupPaletteByHue(palette, colors);

  const isSelected = groups.some((group) =>
    group.colors.some((color) => color.name === name)
  );

  if (isSelected) {
    return flattenHueGroups(
      groups
        .map((group) => ({
          ...group,
          colors: group.colors.filter((color) => color.name !== name),
        }))
        .filter((group) => group.colors.length > 0)
    );
  }

  const nextColor = { name, value: colors[name] ?? name };
  const hue = hueOf(name);
  const existing = groups.find((group) => group.hue === hue);

  if (existing) {
    existing.colors.push(nextColor);
    existing.colors.sort(compareDarkToLight);
  } else {
    groups.push({ hue, colors: [nextColor] });
  }

  return flattenHueGroups(groups);
};

export const reorderPaletteHues = (
  palette: Palette,
  colors: ColorMap,
  startIndex: number,
  endIndex: number
): string[] => {
  const groups = [...groupPaletteByHue(palette, colors)];
  const [removed] = groups.splice(startIndex, 1);
  if (!removed) return flattenHueGroups(groups);
  groups.splice(endIndex, 0, removed);
  return flattenHueGroups(groups);
};
