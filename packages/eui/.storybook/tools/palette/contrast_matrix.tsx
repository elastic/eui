/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  useMemo,
  useState,
} from 'react';

import { useEuiMemoizedStyles, useEuiTheme } from '../../../src/services';
import { EuiBadge } from '../../../src/components/badge';
import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiFormRow } from '../../../src/components/form/form_row';
import { EuiRange } from '../../../src/components/form/range';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiStat } from '../../../src/components/stat';
import { EuiText } from '../../../src/components/text';
import { getApcaContrast } from './apca';
import {
  COLUMNS_VAR,
  ROWS_VAR,
  contrastMatrixStyles,
} from './contrast_matrix.styles';
import {
  ColorMap,
  Palette,
  groupPaletteByHue,
  resolvePalette,
} from './palette';

const SEMANTIC_ELEMENT_WIDTH_STOPS = [
  { px: 2, lc: 60 },
  { px: 3, lc: 45 },
  { px: 10, lc: 20 },
  { px: 15, lc: 15 },
] as const;

export interface ContrastMatrixProps {
  palette: Palette;
  colors: ColorMap;
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

interface PassRate {
  percent: number;
  passing: number;
  total: number;
}

const passRate = (
  values: Array<number | null>,
  threshold: number
): PassRate | null => {
  const checks = values.filter((value): value is number => value != null);
  if (checks.length === 0) return null;
  const passing = checks.filter((value) => Math.abs(value) >= threshold).length;
  return {
    percent: (passing / checks.length) * 100,
    passing,
    total: checks.length,
  };
};

const PassRateStat: FunctionComponent<{
  label: string;
  value: PassRate | null;
  threshold: number;
}> = ({ label, value, threshold }) => {
  const detail =
    value == null
      ? `${label}: no contrast checks`
      : `${label}: ${value.passing} of ${value.total} pairs at or above Lc ${threshold}`;

  return (
    <div title={detail}>
      <EuiStat
        reverse
        titleSize="s"
        title={value == null ? '—' : `${Math.round(value.percent)}%`}
        description={label}
        titleColor={
          value == null
            ? 'subdued'
            : value.percent === 100
            ? 'success'
            : 'default'
        }
        titleElement="p"
        aria-label={detail}
      />
    </div>
  );
};

export const ContrastMatrix: FunctionComponent<ContrastMatrixProps> = ({
  palette,
  colors,
}) => {
  const { euiTheme } = useEuiTheme();
  const styles = useEuiMemoizedStyles(contrastMatrixStyles);

  const [widthStopIndex, setWidthStopIndex] = useState(2);
  const { px: elementWidth, lc: threshold } =
    SEMANTIC_ELEMENT_WIDTH_STOPS[widthStopIndex];

  const themeBackgroundColor = euiTheme.colors.backgroundBasePlain;

  const { columns, rows, contrasts, average, passRates } = useMemo(() => {
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

    const backgroundRow = contrasts[contrasts.length - 1] ?? [];
    const intraRows = contrasts.slice(0, -1);

    const darkerNames = new Set(
      groupPaletteByHue(palette, colors).flatMap((group) =>
        group.colors.length > 0 ? [group.colors[0].name] : []
      )
    );
    const darkerColumns = columns.flatMap((column, index) =>
      darkerNames.has(column.name) ? [index] : []
    );
    const darkerAndBackgroundRows = rows.flatMap((row, index) =>
      row.name === 'background' || darkerNames.has(row.name) ? [index] : []
    );

    const passRates = {
      vsBackground: passRate(backgroundRow, threshold),
      intraColors: passRate(intraRows.flat(), threshold),
      darkerHuesAndBackground: passRate(
        darkerAndBackgroundRows.flatMap((row) =>
          darkerColumns.map((column) => contrasts[row][column])
        ),
        threshold
      ),
    };

    return { columns, rows, contrasts, average, passRates };
  }, [palette, colors, themeBackgroundColor, threshold]);

  return (
    <>
      <EuiFlexGroup alignItems="flexStart" gutterSize="xl" wrap>
        <EuiFlexItem grow={false} css={styles.slider}>
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
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <PassRateStat
            label="vs. background"
            value={passRates.vsBackground}
            threshold={threshold}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <PassRateStat
            label="intra colors"
            value={passRates.intraColors}
            threshold={threshold}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <PassRateStat
            label="darker hues + background"
            value={passRates.darkerHuesAndBackground}
            threshold={threshold}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />

      <div
        css={styles.grid}
        style={
          {
            [COLUMNS_VAR]: columns.length,
            [ROWS_VAR]: rows.length,
          } as CSSProperties
        }
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
