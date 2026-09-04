/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo, useState } from 'react';
import { css } from '@emotion/react';

import { useEuiTheme } from '../../../src/services';
import { useEuiFontSize } from '../../../src/global_styling';
import { EuiBadge } from '../../../src/components/badge';
import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiFormRow } from '../../../src/components/form/form_row';
import { EuiRange } from '../../../src/components/form/range';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiText } from '../../../src/components/text';
import { getApcaContrast } from './apca';
import { PRIMITIVE_COLORS } from './borealis_primitives';
import { ColorMap, Palette, resolvePalette } from './palette';

export const SEMANTIC_ELEMENT_WIDTH_STOPS = [
  { px: 2, lc: 60 },
  { px: 3, lc: 45 },
  { px: 10, lc: 20 },
  { px: 15, lc: 15 },
] as const;

export interface ContrastMatrixProps {
  palette: Palette;
  colors?: ColorMap;
}

const Swatch: FunctionComponent<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <EuiColorPickerSwatch
    color={color}
    disabled
    aria-label={label}
    toolTipProps={{ content: label }}
  />
);

const ContrastBadge: FunctionComponent<{
  value: number;
  passes: boolean;
}> = ({ value, passes }) => (
  <EuiBadge color={passes ? 'success' : 'danger'}>{value.toFixed(1)}</EuiBadge>
);

export const ContrastMatrix: FunctionComponent<ContrastMatrixProps> = ({
  palette,
  colors = PRIMITIVE_COLORS,
}) => {
  const { euiTheme } = useEuiTheme();
  const fontSize = useEuiFontSize('xxs');

  const [widthStopIndex, setWidthStopIndex] = useState(2);
  const { px: elementWidth, lc: threshold } =
    SEMANTIC_ELEMENT_WIDTH_STOPS[widthStopIndex];

  const themeBackgroundColor = euiTheme.colors.backgroundBasePlain;

  const { columns, rows, contrasts, average } = useMemo(() => {
    const columns = resolvePalette(palette, colors);
    const themeBackground = {
      name: 'background',
      value: themeBackgroundColor,
    };
    const rows = [...columns, themeBackground];
    const contrasts = rows.map((background) =>
      columns.map((value) =>
        background.name === value.name
          ? null
          : getApcaContrast(value.value, background.value)
      )
    );
    const abs = contrasts
      .flat()
      .filter((value): value is number => value != null)
      .map(Math.abs);
    const average =
      abs.length > 0
        ? abs.reduce((sum, value) => sum + value, 0) / abs.length
        : null;

    return { columns, rows, contrasts, average };
  }, [palette, colors, themeBackgroundColor]);

  const cell = 48;
  const line = euiTheme.colors.borderBaseSubdued;

  const hairline = (size: string) =>
    `linear-gradient(${line}, ${line}) center / ${size} no-repeat`;

  const styles = {
    slider: css`
      max-inline-size: 320px;
    `,
    grid: css`
      display: inline-grid;
      grid-template-columns: auto ${cell}px repeat(${columns.length}, ${cell}px);
      grid-template-rows: auto ${cell}px repeat(${rows.length}, ${cell}px);
    `,
    cell: css`
      position: relative;
      isolation: isolate;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        inset-block: 0;
        inset-inline: 0;
        z-index: 0;
        pointer-events: none;
      }

      > * {
        position: relative;
        z-index: 1;
      }
    `,
    colHeader: css`
      &::before {
        /* vertical line from the swatch center down into the matrix */
        background: ${hairline('1px 50%')};
        background-position: center bottom;
      }
    `,
    rowHeader: css`
      &::before {
        /* horizontal line from the swatch center across the matrix */
        background: ${hairline('50% 1px')};
        background-position: right center;
      }
    `,
    intersection: css`
      &::before {
        background: ${hairline('1px 100%')}, ${hairline('100% 1px')};
      }
    `,
    axisLabel: css`
      color: ${euiTheme.colors.textSubdued};
      ${fontSize}
    `,
    backgroundLabel: css`
      justify-content: start;
      align-items: center;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      line-height: 1;
      white-space: nowrap;
      ${fontSize}
    `,
    valueLabel: css`
      justify-content: start;
      ${fontSize}
    `,
    average: css`
      padding-inline-start: ${cell}px;
    `,
  };

  return (
    <>
      <div css={styles.slider}>
        <EuiFormRow label="Semantic element width">
          <EuiRange
            min={0}
            max={SEMANTIC_ELEMENT_WIDTH_STOPS.length - 1}
            step={1}
            value={widthStopIndex}
            onChange={(event) =>
              setWidthStopIndex(Number(event.currentTarget.value))
            }
            showTicks
            ticks={SEMANTIC_ELEMENT_WIDTH_STOPS.map((stop, index) => ({
              value: index,
              label: `${stop.px}px`,
              accessibleLabel: `${stop.px} pixels, Lc ${stop.lc}`,
            }))}
            aria-label="Semantic element width"
          />
        </EuiFormRow>
      </div>
      <EuiSpacer size="xl" />

      <div
        css={styles.grid}
        role="table"
        aria-label={`APCA contrast matrix. Rows are the background, columns are the value. Threshold Lc ${threshold} for a ${elementWidth}px element.`}
      >
        <div />
        <div />
        <div css={[styles.cell, styles.axisLabel, styles.valueLabel]}>
          Value
        </div>
        {columns.slice(1).map((value) => (
          <div key={`label-spacer-${value.name}`} />
        ))}

        <div />
        <div />
        {columns.map((value) => (
          <div
            key={`col-${value.name}`}
            css={[styles.cell, styles.colHeader]}
            role="columnheader"
          >
            <Swatch color={value.value} label={`${value.name} value`} />
          </div>
        ))}

        {rows.map((background, row) => (
          <React.Fragment key={background.name}>
            {row === 0 ? (
              <div
                css={[styles.cell, styles.axisLabel, styles.backgroundLabel]}
              >
                Background
              </div>
            ) : (
              <div />
            )}
            <div css={[styles.cell, styles.rowHeader]} role="rowheader">
              <Swatch
                color={background.value}
                label={`${background.name} background`}
              />
            </div>

            {columns.map((value, column) => {
              const key = `${background.name}-on-${value.name}`;
              const contrast = contrasts[row][column];
              const passes =
                contrast != null && Math.abs(contrast) >= threshold;

              return (
                <div
                  key={key}
                  css={[styles.cell, styles.intersection]}
                  role="cell"
                  title={
                    contrast == null
                      ? undefined
                      : `${value.name} value on ${
                          background.name
                        } background: APCA Lc ${contrast.toFixed(1)}`
                  }
                >
                  {contrast != null && (
                    <ContrastBadge value={Math.abs(contrast)} passes={passes} />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {average != null && (
        <>
          <EuiSpacer size="s" />
          <EuiFlexGroup
            css={styles.average}
            alignItems="center"
            gutterSize="s"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <EuiText size="xs" color="subdued">
                Avg contrast
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <ContrastBadge value={average} passes={average >= threshold} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      )}
    </>
  );
};
