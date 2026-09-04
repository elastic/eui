/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import { css } from '@emotion/react';

import { useEuiTheme } from '../../../src/services';
import { useEuiFontSize } from '../../../src/global_styling';
import { PRIMITIVE_COLORS } from './borealis_primitives';
import { ColorMap, Palette, parseColorName, resolvePalette } from './palette';

export interface ColorGridProps {
  palette: Palette;
  colors?: ColorMap;
  cellSize?: number;
}

export const ColorGrid: FunctionComponent<ColorGridProps> = ({
  palette,
  colors = PRIMITIVE_COLORS,
  cellSize = 32,
}) => {
  const { euiTheme } = useEuiTheme();
  const fontSize = useEuiFontSize('xs');

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

  const columnTemplate = `repeat(${shades.length}, ${cellSize}px)`;

  const styles = {
    stack: css`
      display: inline-flex;
      flex-direction: column;
      gap: ${euiTheme.size.m};
    `,
    grid: css`
      display: inline-grid;
      grid-template-columns: ${columnTemplate};
      gap: 1px;
      background-color: ${euiTheme.colors.borderBaseSubdued};
      border: 1px solid ${euiTheme.colors.borderBaseSubdued};
    `,
    cell: css`
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: ${cellSize}px;
      inline-size: ${cellSize}px;
      background-color: ${euiTheme.colors.backgroundBasePlain};
      color: ${euiTheme.colors.plainDark};
      font-family: ${euiTheme.font.familyCode};
      font-weight: ${euiTheme.font.weight.medium};
      ${fontSize}
    `,
    labels: css`
      display: inline-grid;
      grid-template-columns: ${columnTemplate};
      ${fontSize}
      font-family: ${euiTheme.font.familyCode};
      text-align: center;
      color: ${euiTheme.colors.textDisabled};
    `,
    usedLabel: css`
      color: ${euiTheme.colors.textParagraph};
      font-weight: ${euiTheme.font.weight.bold};
    `,
  };

  return (
    <div>
      <div css={styles.stack}>
        <div css={styles.grid}>
          {hues.map((hue) =>
            shades.map((shade) => {
              const name = `${hue}${shade}`;
              const swatch = filled.get(name);

              return (
                <div
                  key={name}
                  css={styles.cell}
                  style={swatch && { backgroundColor: swatch.value }}
                  title={
                    swatch
                      ? `${swatch.index} · ${name} — ${swatch.value}`
                      : name
                  }
                >
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
      </div>
    </div>
  );
};
