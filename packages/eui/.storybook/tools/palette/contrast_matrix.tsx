/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import { css } from '@emotion/react';

import { UseEuiTheme, useEuiTheme } from '../../../src/services';
import { getColorContrast } from '../../../src/services/color/contrast';
import { EuiBadge } from '../../../src/components/badge';
import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiStat } from '../../../src/components/stat';
import { ColorMap, Palette } from './palette';

// WCAG 2.1 SC 1.4.11 Non-text Contrast
const THRESHOLD = 3;

const tableStyles = css`
  border-collapse: collapse;
`;

const cellStyles = css`
  inline-size: 48px;
  block-size: 48px;
  padding: 0;
  text-align: center;
  vertical-align: middle;
`;

const hairlines =
  (...layers: string[]) =>
  ({ euiTheme }: UseEuiTheme) => {
    const line = euiTheme.colors.borderBaseSubdued;
    // Solid-color gradients, because `background-color` can't be sized or positioned
    return css`
      background: ${layers
        .map((layer) => `linear-gradient(${line}, ${line}) ${layer} no-repeat`)
        .join(', ')};
    `;
  };

const colHeaderStyles = hairlines('center bottom / 1px 50%');
const rowHeaderStyles = hairlines('right center / 50% 1px');
const intersectionStyles = hairlines('center / 1px 100%', 'center / 100% 1px');

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
  passes?: boolean;
}> = ({ value, passes }) => (
  <EuiBadge color={passes == null ? 'hollow' : passes ? 'success' : 'danger'}>
    {value.toFixed(1)}
  </EuiBadge>
);

interface PassRate {
  percent: number;
  passing: number;
  total: number;
}

const passRate = (values: number[]): PassRate | null => {
  if (values.length === 0) return null;
  const passing = values.filter((value) => value >= THRESHOLD).length;
  return {
    percent: (passing / values.length) * 100,
    passing,
    total: values.length,
  };
};

const mean = (values: number[]) =>
  values.length > 0
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : null;

const AverageStat: FunctionComponent<{
  label: string;
  value: number | null;
}> = ({ label, value }) => (
  <EuiStat
    reverse
    titleSize="s"
    title={value == null ? '—' : `${value.toFixed(2)}:1`}
    description={label}
    titleColor={value == null ? 'subdued' : 'default'}
    titleElement="p"
  />
);

const PassRateStat: FunctionComponent<{
  label: string;
  value: PassRate | null;
}> = ({ label, value }) => {
  const detail =
    value == null
      ? `${label}: no contrast checks`
      : `${label}: ${value.passing} of ${value.total} pairs at or above ${THRESHOLD}:1`;

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

  const themeBackgroundColor = euiTheme.colors.backgroundBasePlain;

  const { columns, rows, stats } = useMemo(() => {
    const columns = palette.map((name) => ({ name, value: colors[name] }));
    const ratiosAgainst = (value: string, count: number) =>
      columns
        .slice(0, count)
        .map((column) => getColorContrast(column.value, value));

    const background = {
      name: 'background',
      value: themeBackgroundColor,
      graded: true,
      ratios: ratiosAgainst(themeBackgroundColor, columns.length),
    };
    const paletteRows = columns
      .map((color, index) => ({
        ...color,
        graded: false,
        ratios: ratiosAgainst(color.value, index),
      }))
      .slice(1)
      .reverse();

    const stats = {
      backgroundPassRate: passRate(background.ratios),
      backgroundAverage: mean(background.ratios),
      intraAverage: mean(paletteRows.flatMap((row) => row.ratios)),
    };

    return { columns, rows: [background, ...paletteRows], stats };
  }, [palette, colors, themeBackgroundColor]);

  return (
    <>
      <EuiFlexGroup alignItems="flexStart" gutterSize="xl" wrap>
        <EuiFlexItem grow={false}>
          <PassRateStat
            label="vs. background"
            value={stats.backgroundPassRate}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <AverageStat
            label="avg. vs. background"
            value={stats.backgroundAverage}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <AverageStat label="avg. intra palette" value={stats.intraAverage} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />

      <table css={tableStyles}>
        <thead>
          <tr>
            <td css={cellStyles} />
            {columns.map((columnColor) => (
              <th
                key={columnColor.name}
                scope="col"
                css={[cellStyles, colHeaderStyles]}
              >
                <Swatch color={columnColor.value} label={columnColor.name} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" css={[cellStyles, rowHeaderStyles]}>
                <Swatch color={row.value} label={row.name} />
              </th>

              {row.ratios.map((ratio, column) => (
                <td
                  key={columns[column].name}
                  css={[cellStyles, intersectionStyles]}
                  title={`${columns[column].name} / ${
                    row.name
                  }: ${ratio.toFixed(2)}:1`}
                >
                  <ContrastBadge
                    value={ratio}
                    passes={row.graded ? ratio >= THRESHOLD : undefined}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
