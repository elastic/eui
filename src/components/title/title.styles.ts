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
  logicalCSS,
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
  euiThemeContext: UseEuiTheme,
  scale: EuiTitleSize = 'm',
  options?: _FontScaleOptions
): EuiThemeTitle => {
  const { euiTheme } = euiThemeContext;
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
    ...euiFontSize(
      euiThemeContext,
      titleScaleToFontSizeScaleMap[scale],
      options
    ),
    fontWeight: euiTheme.font.weight[euiTheme.font.title.weight],
    color: euiTheme.colors.title,
  };
};

// Hook version
export const useEuiTitle = (
  scale: EuiTitleSize,
  options?: _FontScaleOptions
): EuiThemeTitle => {
  const euiTheme = useEuiTheme();
  return euiTitle(euiTheme, scale, options);
};

/**
 * Styles
 */
export const euiTitleStyles = (euiThemeContext: UseEuiTheme) => ({
  euiTitle: css`
    ${euiTextBreakWord()}

    & + & {
      ${logicalCSS('margin-top', euiThemeContext.euiTheme.size.l)}
    }
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  // Sizes
  xxxs: css`
    ${euiTitle(euiThemeContext, 'xxxs')}
  `,
  xxs: css`
    ${euiTitle(euiThemeContext, 'xxs')}
  `,
  xs: css`
    ${euiTitle(euiThemeContext, 'xs')}
  `,
  s: css`
    ${euiTitle(euiThemeContext, 's')}
  `,
  m: css`
    ${euiTitle(euiThemeContext, 'm')}
  `,
  l: css`
    ${euiTitle(euiThemeContext, 'l')}
  `,
});
