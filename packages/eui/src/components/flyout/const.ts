/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiBreakpointSize } from '../../services';

/** Allowed flyout render types. */
export const FLYOUT_TYPES = ['push', 'overlay'] as const;
/** Type representing a supported flyout render type. */
export type _EuiFlyoutType = (typeof FLYOUT_TYPES)[number];

/** Allowed flyout attachment sides. */
export const FLYOUT_SIDES = ['left', 'right'] as const;
/** Type representing a supported flyout side. */
export type _EuiFlyoutSide = (typeof FLYOUT_SIDES)[number];

/** Allowed named flyout sizes used by the manager. */
export const FLYOUT_SIZES = ['s', 'm', 'l', 'fill'] as const;
/** Type representing a supported named flyout size. */
export type EuiFlyoutSize = (typeof FLYOUT_SIZES)[number];

/** Allowed padding sizes for flyout content. */
export const FLYOUT_PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
/** Type representing a supported flyout padding size. */
export type _EuiFlyoutPaddingSize = (typeof FLYOUT_PADDING_SIZES)[number];

/** Default minimum breakpoint at which push-type flyouts begin to push content. */
export const DEFAULT_PUSH_MIN_BREAKPOINT: EuiBreakpointSize = 'l';
/** Default flyout type when none is provided. */
export const DEFAULT_TYPE: _EuiFlyoutType = 'overlay';
/** Default side where flyouts anchor when none is provided. */
export const DEFAULT_SIDE: _EuiFlyoutSide = 'right';
/** Default named flyout size. */
export const DEFAULT_SIZE: EuiFlyoutSize = 'm';
/** Default padding size inside flyouts. */
export const DEFAULT_PADDING_SIZE: _EuiFlyoutPaddingSize = 'l';

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
export function isEuiFlyoutSizeNamed(value: unknown): value is EuiFlyoutSize {
  return FLYOUT_SIZES.includes(value as EuiFlyoutSize);
}
