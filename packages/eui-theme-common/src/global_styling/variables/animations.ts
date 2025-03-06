/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { CSSProperties } from 'react';

/**
 * A constant storing the `prefers-reduced-motion` media query
 * so that when it is turned off, animations are not run.
 */
export const euiCanAnimate =
  '@media screen and (prefers-reduced-motion: no-preference)';

/**
 * A constant storing the `prefers-reduced-motion` media query that will
 * only apply the content if the setting is off (reduce).
 */
export const euiCantAnimate =
  '@media screen and (prefers-reduced-motion: reduce)';

/**
 * Speeds / Durations / Delays
 */

export const EuiThemeAnimationSpeeds = [
  'extraFast',
  'fast',
  'normal',
  'slow',
  'extraSlow',
] as const;

export type _EuiThemeAnimationSpeed = (typeof EuiThemeAnimationSpeeds)[number];

export type _EuiThemeAnimationSpeeds = {
  /** - Default value: 90ms */
  extraFast: CSSProperties['animationDuration'];
  /** - Default value: 150ms */
  fast: CSSProperties['animationDuration'];
  /** - Default value: 250ms */
  normal: CSSProperties['animationDuration'];
  /** - Default value: 350ms */
  slow: CSSProperties['animationDuration'];
  /** - Default value: 500ms */
  extraSlow: CSSProperties['animationDuration'];
};

/**
 * Easings / Timing functions
 */

export const EuiThemeAnimationEasings = ['bounce', 'resistance'] as const;

export type _EuiThemeAnimationEasing =
  (typeof EuiThemeAnimationEasings)[number];

export type _EuiThemeAnimationEasings = Record<
  _EuiThemeAnimationEasing,
  CSSProperties['animationTimingFunction']
>;

export type _EuiThemeAnimation = _EuiThemeAnimationEasings &
  _EuiThemeAnimationSpeeds;
