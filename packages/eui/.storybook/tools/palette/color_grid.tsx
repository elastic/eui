/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { css } from '@emotion/react';

import {
  UseEuiTheme,
  useEuiMemoizedStyles,
  useEuiTheme,
} from '../../../src/services';
import { getColorContrast } from '../../../src/services/color/contrast';
import { euiFontSize } from '../../../src/global_styling';
import { EuiFlexGroup } from '../../../src/components/flex';
import { ColorMap, Palette, parseColorName } from './palette';

const COLUMNS_VAR = '--colorGridColumns';
const CELL_COLOR_VAR = '--colorGridCellColor';

const CELL_SIZE = '32px';
const GAP = '1px';

const colorGridStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 'xs');
  const columns = `repeat(var(${COLUMNS_VAR}), ${CELL_SIZE})`;

  const text = `
    font-family: ${euiTheme.font.familyCode};
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;

  return {
    grid: css`
      display: inline-grid;
      grid-template-columns: ${columns};
      gap: ${GAP};
      background-color: ${euiTheme.colors.borderBaseSubdued};
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseSubdued};
    `,
    cell: css`
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: ${CELL_SIZE};
      inline-size: ${CELL_SIZE};
      background-color: ${euiTheme.colors.backgroundBasePlain};
      color: ${euiTheme.colors.plainDark};
      font-weight: ${euiTheme.font.weight.medium};
      ${text}
    `,
    interactive: css`
      appearance: none;
      margin: 0;
      padding: 0;
      border: 0;
      cursor: pointer;

      &:hover:not([aria-pressed='true']) {
        background-color: var(${CELL_COLOR_VAR});
      }

      &:focus-visible {
        z-index: 1;
      }
    `,
    labels: css`
      display: inline-grid;
      grid-template-columns: ${columns};
      gap: ${GAP};
      padding-inline: ${euiTheme.border.width.thin};
      text-align: center;
      color: ${euiTheme.colors.textDisabled};
      ${text}
    `,
    usedLabel: css`
      color: ${euiTheme.colors.textParagraph};
      font-weight: ${euiTheme.font.weight.bold};
    `,
  };
};

export interface ColorGridProps {
  palette: Palette;
  colors: ColorMap;
  onToggleColor: (name: string) => void;
}

export const ColorGrid: FunctionComponent<ColorGridProps> = ({
  palette,
  colors,
  onToggleColor,
}) => {
  const styles = useEuiMemoizedStyles(colorGridStyles);
  const { euiTheme } = useEuiTheme();
  const { plainDark, plainLight } = euiTheme.colors;

  const getTextColor = (background: string) =>
    getColorContrast(plainDark, background) >=
    getColorContrast(plainLight, background)
      ? plainDark
      : plainLight;

  const { hues, shades } = useMemo(() => {
    const hues = new Set<string>();
    const shades = new Set<number>();
    Object.keys(colors).forEach((name) => {
      const parsed = parseColorName(name);
      if (!parsed || parsed.hue === 'blueGrey') return;
      hues.add(parsed.hue);
      shades.add(parsed.shade);
    });
    return { hues: [...hues], shades: [...shades].sort((a, b) => a - b) };
  }, [colors]);

  const usedShades = new Set(
    palette.map((name) => parseColorName(name)?.shade)
  );

  return (
    <EuiFlexGroup
      direction="column"
      alignItems="flexStart"
      gutterSize="m"
      responsive={false}
      style={{ [COLUMNS_VAR]: shades.length } as CSSProperties}
    >
      <div css={styles.grid} role="group" aria-label="Palette colors">
        {hues.map((hue) =>
          shades.map((shade) => {
            const name = `${hue}${shade}`;
            const value = colors[name];
            if (!value) return <div key={name} css={styles.cell} />;

            const index = palette.indexOf(name);
            const isSelected = index !== -1;

            return (
              <button
                key={name}
                type="button"
                aria-pressed={isSelected}
                aria-label={`${isSelected ? 'Remove' : 'Add'} ${name} ${
                  isSelected ? 'from' : 'to'
                } palette`}
                title={`${name} — ${value}`}
                css={[styles.cell, styles.interactive]}
                style={
                  {
                    [CELL_COLOR_VAR]: value,
                    ...(isSelected && {
                      backgroundColor: value,
                      color: getTextColor(value),
                    }),
                  } as CSSProperties
                }
                onClick={() => onToggleColor(name)}
              >
                {isSelected && index + 1}
              </button>
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
