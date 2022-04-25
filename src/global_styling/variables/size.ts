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

export type _EuiThemeSizes = Record<_EuiThemeSize, string>;
