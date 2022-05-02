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
} from '../functions/typography';
import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import {
  _EuiThemeFontScale,
  _EuiThemeFontSizeMeasurement,
} from '../variables/typography';

export type EuiThemeFontSize = {
  fontSize: CSSProperties['fontSize'];
  lineHeight: CSSProperties['lineHeight'];
};

/**
 * Returns font-size and line-height
 */
export const euiFontSize = (
  scale: _EuiThemeFontScale,
  euiTheme: UseEuiTheme['euiTheme'],
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
): EuiThemeFontSize => {
  return {
    fontSize: euiFontSizeFromScale(scale, euiTheme, measurement),
    lineHeight: euiLineHeightFromBaseline(scale, euiTheme, measurement),
  };
};

// Hook version
export const useEuiFontSize = (
  scale: _EuiThemeFontScale = 'm',
  measurement: _EuiThemeFontSizeMeasurement = 'rem'
): EuiThemeFontSize => {
  const { euiTheme } = useEuiTheme();
  return euiFontSize(scale, euiTheme, measurement);
};

/**
 * Force text to wrap on natural word breaks (e.g. spaces & hyphens)
 * https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
 */
export const euiTextBreakWord = () => `
  overflow-wrap: break-word !important; // makes sure the long string will wrap and not bust out of the container
  word-wrap: break-word !important; // spec says, they are literally just alternate names for each other but some browsers support one and not the other
  word-break: break-word; // IE doesn't understand but that's ok
`;

/**
 * Prevent text from wrapping onto multiple lines, and truncate with an ellipsis.
 */
export const euiTextTruncate = (
  maxWidth: CSSProperties['maxWidth'] = '100%'
) => `
  max-width: ${maxWidth}; // Ensure that the node has a maximum width after which truncation can occur
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
`;

/**
 * Fixed-width numbers for tabular data
 */
export const euiNumberFormat = (euiTheme: UseEuiTheme['euiTheme']) => `
  font-feature-settings: ${euiTheme.font.featureSettings}, 'tnum' 1;
`;
// Hook version
export const useEuiNumberFormat = (): string => {
  const { euiTheme } = useEuiTheme();
  return euiNumberFormat(euiTheme);
};
