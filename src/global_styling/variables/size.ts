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

export type _EuiThemeSize = typeof EuiThemeSizes[number];

export type _EuiThemeSizes = {
  /** value: 2px */
  xxs: string;
  /** value: 4px */
  xs: string;
  /** value: 8px */
  s: string;
  /** value: 12px */
  m: string;
  /** value: 16px */
  base: string;
  /** value: 24px */
  l: string;
  /** value: 32px */
  xl: string;
  /** value: 40px */
  xxl: string;
  /** value: 48px */
  xxxl: string;
  /** value: 64px */
  xxxxl: string;
};
