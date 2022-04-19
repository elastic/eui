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
