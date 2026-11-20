/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type ColorMap = Record<string, string>;

export type Palette = string[];

export interface PaletteHueGroup {
  hue: string;
  names: string[];
}

export const parseColorName = (
  name: string
): { hue: string; shade: number } | null => {
  const match = /^(.*?)(\d+)$/.exec(name);
  return match ? { hue: match[1], shade: Number(match[2]) } : null;
};

const hueOf = (name: string) => parseColorName(name)?.hue ?? name;
const shadeOf = (name: string) => parseColorName(name)?.shade ?? 0;

export const groupPaletteByHue = (palette: Palette): PaletteHueGroup[] => {
  const groups = new Map<string, string[]>();
  palette.forEach((name) => {
    const hue = hueOf(name);
    groups.set(hue, [...(groups.get(hue) ?? []), name]);
  });

  return [...groups].map(([hue, names]) => ({
    hue,
    names: names.sort((a, b) => shadeOf(b) - shadeOf(a)),
  }));
};

const flattenHueGroups = (groups: PaletteHueGroup[]): Palette =>
  groups.flatMap((group) => group.names);

const sortPalette = (names: string[]): Palette =>
  flattenHueGroups(groupPaletteByHue(names));

/** Maps color values (e.g. a theme palette) back to their names in `colors`. */
export const paletteFromValues = (
  values: string[],
  colors: ColorMap
): Palette => {
  const nameByValue = new Map(
    Object.entries(colors).map(([name, value]) => [value.toLowerCase(), name])
  );
  return sortPalette(
    values.flatMap((value) => nameByValue.get(value.toLowerCase()) ?? [])
  );
};

export const togglePaletteColor = (palette: Palette, name: string): Palette =>
  palette.includes(name)
    ? palette.filter((current) => current !== name)
    : sortPalette([...palette, name]);

export const reorderPaletteHues = (
  palette: Palette,
  startIndex: number,
  endIndex: number
): Palette => {
  const groups = groupPaletteByHue(palette);
  const [moved] = groups.splice(startIndex, 1);
  if (moved) groups.splice(endIndex, 0, moved);
  return flattenHueGroups(groups);
};
