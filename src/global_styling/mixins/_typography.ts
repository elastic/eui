/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import {
  euiLineHeightFromBaseline,
  euiFontSizeFromScale,
  _FontScaleOptions,
} from '../functions/typography';
import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import { _EuiThemeFontScale } from '../variables/typography';
import { logicalCSS } from '../functions';

export type EuiThemeFontSize = {
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
};

/**
 * Returns font-size and line-height
 */
export const euiFontSize = (
  { euiTheme }: UseEuiTheme,
  scale: _EuiThemeFontScale,
  options?: _FontScaleOptions
): EuiThemeFontSize => {
  return {
    fontSize: euiFontSizeFromScale(scale, euiTheme, options),
    lineHeight: euiLineHeightFromBaseline(scale, euiTheme, options),
  };
};
export const useEuiFontSize = (
  scale: _EuiThemeFontScale,
  options?: _FontScaleOptions
): EuiThemeFontSize => {
  const euiTheme = useEuiTheme();
  return euiFontSize(euiTheme, scale, options);
};

/**
 * Force text to wrap on natural word breaks (e.g. spaces & hyphens)
 * https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
 */
export const euiTextBreakWord = () => `
  overflow-wrap: break-word !important; // makes sure the long string will wrap and not bust out of the container
  word-break: break-word;
`;

/**
 * Prevent text from wrapping onto multiple lines, and truncate with an ellipsis.
 */
export const euiTextTruncate = (
  maxWidth: CSSProperties['maxWidth'] = '100%'
) => `
  ${
    logicalCSS('max-width', maxWidth) // Ensure that the node has a maximum width after which truncation can occur
  }
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
`;

/**
 * Fixed-width numbers for tabular data
 */
export const euiNumberFormat = ({ euiTheme }: UseEuiTheme) => `
  font-feature-settings: ${euiTheme.font.featureSettings}, 'tnum' 1;
`;
export const useEuiNumberFormat = (): string => {
  const euiTheme = useEuiTheme();
  return euiNumberFormat(euiTheme);
};
