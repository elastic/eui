/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/** Tentative usage; these exist only to be used as button directly when used within other components */
export const SEVERITY_COLORS = ['neutral', 'risk'] as const;

export const BUTTON_COLORS = [
  'text',
  'accent',
  'accentSecondary',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export const EXTENDED_BUTTON_COLORS = [
  ...BUTTON_COLORS,
  ...SEVERITY_COLORS,
] as const;
export type _EuiButtonColor = (typeof BUTTON_COLORS)[number];
export type _EuiExtendedButtonColor = (typeof EXTENDED_BUTTON_COLORS)[number];

export const BUTTON_DISPLAYS = ['base', 'fill', 'empty'] as const;
export type _EuiButtonDisplay = (typeof BUTTON_DISPLAYS)[number];

/** EuiButtonDisplay / Empty / Icon sizes. EuiButton's public SIZES is `s` | `m` only. */
export const BUTTON_DISPLAY_SIZES = ['xs', 's', 'm'] as const;
export type _EuiButtonDisplaySize = (typeof BUTTON_DISPLAY_SIZES)[number];
