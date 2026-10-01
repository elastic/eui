/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

import { useEuiMemoizedStyles } from '../../../src/services';
import { EuiFlexGroup } from '../../../src/components/flex';
import {
  CELL_COLOR_VAR,
  CELL_SIZE_VAR,
  COLUMNS_VAR,
  colorGridStyles,
} from './color_grid.styles';
import { ColorMap, Palette, parseColorName, resolvePalette } from './palette';

export interface ColorGridProps {
  palette: Palette;
  colors: ColorMap;
  cellSize?: number;
  onToggleColor?: (name: string) => void;
}

export const ColorGrid: FunctionComponent<ColorGridProps> = ({
  palette,
  colors,
  cellSize = 32,
  onToggleColor,
}) => {
  const styles = useEuiMemoizedStyles(colorGridStyles);

  const { hues, shades } = useMemo(() => {
    const hues: string[] = [];
    const shadeSet = new Set<number>();

    Object.keys(colors).forEach((name) => {
      const parsed = parseColorName(name);
      if (!parsed) return;

      if (!hues.includes(parsed.hue)) hues.push(parsed.hue);
      shadeSet.add(parsed.shade);
    });

    // Prefer the 10-step ramp shared by the chromatic hues; keep any extra
    // shade that a palette color actually lands on.
    const chromaticShades = [...shadeSet].filter((shade) =>
      hues.some((hue) => hue !== 'blueGrey' && `${hue}${shade}` in colors)
    );

    resolvePalette(palette, colors).forEach((color) => {
      const parsed = parseColorName(color.name);
      if (parsed) chromaticShades.push(parsed.shade);
    });

    const shades = [...new Set(chromaticShades)].sort((a, b) => a - b);

    return {
      hues,
      shades: shades.length > 0 ? shades : [...shadeSet].sort((a, b) => a - b),
    };
  }, [palette, colors]);

  const { filled, usedShades } = useMemo(() => {
    const resolved = resolvePalette(palette, colors);
    const isOnGrid = (name: string) =>
      name in colors && parseColorName(name) != null;

    const filled = new Map<string, { value: string; index: number }>();

    resolved.forEach((color, i) => {
      if (!isOnGrid(color.name) || filled.has(color.name)) return;
      filled.set(color.name, { value: color.value, index: i + 1 });
    });

    return {
      filled,
      usedShades: new Set(
        [...filled.keys()].flatMap((name) => {
          const parsed = parseColorName(name);
          return parsed ? [parsed.shade] : [];
        })
      ),
    };
  }, [palette, colors]);

  const gridVars = {
    [COLUMNS_VAR]: shades.length,
    [CELL_SIZE_VAR]: `${cellSize}px`,
  } as CSSProperties;

  return (
    <EuiFlexGroup
      direction="column"
      alignItems="flexStart"
      gutterSize="m"
      responsive={false}
      style={gridVars}
    >
      <div
        css={styles.grid}
        role={onToggleColor ? 'group' : undefined}
        aria-label={onToggleColor ? 'Palette colors' : undefined}
      >
        {hues.map((hue) =>
          shades.map((shade) => {
            const name = `${hue}${shade}`;
            const value = colors[name];
            const swatch = filled.get(name);
            const isInteractive = Boolean(
              onToggleColor && value && value !== 'transparent'
            );

            const title = swatch
              ? `${swatch.index} · ${name} — ${swatch.value}`
              : name;
            const style = {
              [CELL_COLOR_VAR]: value,
              ...(swatch && { backgroundColor: swatch.value }),
            } as CSSProperties;

            if (isInteractive) {
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={Boolean(swatch)}
                  aria-label={
                    swatch
                      ? `Remove ${name} from palette`
                      : `Add ${name} to palette`
                  }
                  title={`${title} · Click to ${swatch ? 'remove' : 'add'}`}
                  css={[styles.cell, styles.interactive]}
                  style={style}
                  onClick={() => onToggleColor?.(name)}
                >
                  {swatch?.index}
                </button>
              );
            }

            return (
              <div key={name} css={styles.cell} style={style} title={title}>
                {swatch?.index}
              </div>
            );
          })
        )}
      </div>

      <div css={styles.labels}>
        {shades.map((shade) => (
          <span
            key={shade}
            css={usedShades.has(shade) ? styles.usedLabel : undefined}
          >
            {shade}
          </span>
        ))}
      </div>
    </EuiFlexGroup>
  );
};
