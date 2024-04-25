/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type _EuiThemeBase = number;

export const EuiThemeSizes = [
  'xxs',
  'xs',
  's',
  'm',
  'base',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxxl',
] as const;

export type _EuiThemeSize = (typeof EuiThemeSizes)[number];

export type _EuiThemeSizes = {
  /** - Default value: 2px */
  xxs: string;
  /** - Default value: 4px */
  xs: string;
  /** - Default value: 8px */
  s: string;
  /** - Default value: 12px */
  m: string;
  /** - Default value: 16px */
  base: string;
  /** - Default value: 24px */
  l: string;
  /** - Default value: 32px */
  xl: string;
  /** - Default value: 40px */
  xxl: string;
  /** - Default value: 48px */
  xxxl: string;
  /** - Default value: 64px */
  xxxxl: string;
};
