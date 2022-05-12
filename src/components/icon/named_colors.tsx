/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const colorToClassMap = {
  default: null,
  primary: 'euiIcon--primary',
  success: 'euiIcon--success',
  accent: 'euiIcon--accent',
  warning: 'euiIcon--warning',
  danger: 'euiIcon--danger',
  text: 'euiIcon--text',
  subdued: 'euiIcon--subdued',
  ghost: 'euiIcon--ghost',
  inherit: 'euiIcon--inherit',
};

export type NamedColor = keyof typeof colorToClassMap;

export function isNamedColor(name: string): name is NamedColor {
  return colorToClassMap.hasOwnProperty(name);
}
