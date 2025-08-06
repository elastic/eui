/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiBreakpointSize } from '../../services';

export const FLYOUT_TYPES = ['push', 'overlay'] as const;
export type _EuiFlyoutType = (typeof FLYOUT_TYPES)[number];

export const FLYOUT_SIDES = ['left', 'right'] as const;
export type _EuiFlyoutSide = (typeof FLYOUT_SIDES)[number];

export const FLYOUT_SIZES = ['s', 'm', 'l'] as const;
export type EuiFlyoutSize = (typeof FLYOUT_SIZES)[number];

export const FLYOUT_PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export type _EuiFlyoutPaddingSize = (typeof FLYOUT_PADDING_SIZES)[number];

export const DEFAULT_PUSH_MIN_BREAKPOINT: EuiBreakpointSize = 'l';
export const DEFAULT_TYPE: _EuiFlyoutType = 'overlay';
export const DEFAULT_SIDE: _EuiFlyoutSide = 'right';
export const DEFAULT_SIZE: EuiFlyoutSize = 'm';
export const DEFAULT_PADDING_SIZE: _EuiFlyoutPaddingSize = 'l';

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
export function isEuiFlyoutSizeNamed(value: any): value is EuiFlyoutSize {
  return FLYOUT_SIZES.includes(value as any);
}
