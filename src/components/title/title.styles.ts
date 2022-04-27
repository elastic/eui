/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { css } from '@emotion/react';
import { UseEuiTheme, useEuiTheme } from '../../services';
import {
  euiTextBreakWord,
  euiFontSizeFromScale,
  euiLineHeightFromBaseline,
  _EuiThemeFontScale,
  _EuiThemeFontSizeMeasurement,
} from '../../global_styling';
import { EuiTitleSize } from './title';

/**
 * Theme-specific scale settings
 */
type _EuiThemeTitle = {
  fontSize: _EuiThemeFontScale;
  lineHeight: _EuiThemeFontScale;
  fontWeight?: CSSProperties['fontWeight']; // Defaults to bold
  letterSpacing?: string; // Not currently used in Amsterdam, but may be used in future themes
};

const amsterdamThemeTitles: {
  [size in EuiTitleSize]: _EuiThemeTitle;
} = {
  xxxs: {
    fontSize: 'xs',
    lineHeight: 'xs',
  },
  xxs: {
    fontSize: 's',
    lineHeight: 'm',
  },
  xs: {
    fontSize: 'm',
    lineHeight: 'm',
  },
  s: {
    fontSize: 'l',
    lineHeight: 'xl',
  },
  m: {
    fontSize: 'xl',
    lineHeight: 'xl',
  },
  l: {
    fontSize: 'xxl',
    lineHeight: 'xxl',
  },
};

/**
 * Mixin
 */
type EuiThemeTitle = {
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
  fontWeight: CSSProperties['fontWeight'];
};

export const euiTitle = (
  scale: EuiTitleSize = 'm',
  euiTheme: UseEuiTheme['euiTheme'],
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
): EuiThemeTitle => {
  // NOTE: For future themes, we can conditionally key off `euiTheme.themeName`
  // and conditionally switch our title settings.
  const title = amsterdamThemeTitles[scale];

  return {
    fontSize: euiFontSizeFromScale(title.fontSize, euiTheme, measurement),
    lineHeight: euiLineHeightFromBaseline(
      title.lineHeight,
      euiTheme,
      measurement
    ),
    fontWeight: euiTheme.font.weight[euiTheme.font.title.weight],
  };
};

// Hook version
export const useEuiTitle = (
  scale: EuiTitleSize = 'm',
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
): EuiThemeTitle => {
  const { euiTheme } = useEuiTheme();
  return euiTitle(scale, euiTheme, measurement);
};

/**
 * Styles
 */
export const euiTitleStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiTitle: css`
    ${euiTextBreakWord}
    color: ${euiTheme.colors.title};

    & + & {
      margin-top: ${euiTheme.size.l};
    }
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  // Sizes
  xxxs: css`
    ${euiTitle('xxxs', euiTheme)}
  `,
  xxs: css`
    ${euiTitle('xxs', euiTheme)}
  `,
  xs: css`
    ${euiTitle('xs', euiTheme)}
  `,
  s: css`
    ${euiTitle('s', euiTheme)}
  `,
  m: css`
    ${euiTitle('m', euiTheme)}
  `,
  l: css`
    ${euiTitle('l', euiTheme)}
  `,
});
