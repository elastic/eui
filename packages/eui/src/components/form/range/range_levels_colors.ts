/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../../services';

import type { EuiRangeLevel } from './types';

export const LEVEL_COLORS = [
  'primary',
  'success',
  'warning',
  'danger',
] as const;
export type EuiRangeLevelColor = (typeof LEVEL_COLORS)[number];

export const isNamedLevelColor = (color?: EuiRangeLevelColor | string) =>
  LEVEL_COLORS.includes(color as EuiRangeLevelColor);

export const euiRangeLevelColor = (
  color: EuiRangeLevelColor | string,
  euiTheme: UseEuiTheme['euiTheme']
) => {
  return isNamedLevelColor(color)
    ? euiTheme.colors[color as EuiRangeLevelColor]
    : color;
};

export const getLevelColor = (levels: EuiRangeLevel[], value: number) => {
  let color;
  for (const level of levels) {
    if (level.min <= value && level.max >= value) {
      color = level.color;
      return color;
    }
  }
  return undefined;
};
