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
  euiFontSize,
  _EuiThemeFontScale,
  _FontScaleOptions,
} from '../../global_styling';
import { EuiTitleSize } from './title';

/**
 * Mixin
 */
type EuiThemeTitle = {
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
  fontWeight: CSSProperties['fontWeight'];
  color: CSSProperties['color'];
};

export const euiTitle = (
  scale: EuiTitleSize,
  euiTheme: UseEuiTheme['euiTheme'],
  options?: _FontScaleOptions
): EuiThemeTitle => {
  const titleScaleToFontSizeScaleMap: {
    [size in EuiTitleSize]: _EuiThemeFontScale;
  } = {
    xxxs: 'xs',
    xxs: 's',
    xs: 'm',
    s: 'l',
    m: 'xl',
    l: 'xxl',
  };

  return {
    ...euiFontSize(titleScaleToFontSizeScaleMap[scale], euiTheme, options),
    fontWeight: euiTheme.font.weight[euiTheme.font.title.weight],
    color: euiTheme.colors.title,
  };
};

// Hook version
export const useEuiTitle = (
  scale: EuiTitleSize,
  options?: _FontScaleOptions
): EuiThemeTitle => {
  const { euiTheme } = useEuiTheme();
  return euiTitle(scale, euiTheme, options);
};

/**
 * Styles
 */
export const euiTitleStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiTitle: css`
    ${euiTextBreakWord()}

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
