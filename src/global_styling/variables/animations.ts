/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';

/**
 * A quick wrapping function around the provided content that adds the
 * `prefers-reduced-motion` media query so that when it is turn off,
 * animations are not run.
 * @param content
 * @returns string
 */
export const euiCanAnimate = (content: string) => `
@media screen and (prefers-reduced-motion: no-preference) {
    ${content}
  }
`;

/**
 * A quick wrapping function around the provided content that adds the
 * `prefers-reduced-motion` media query that will only run the content if
 * the setting is off (reduce).
 * @param content
 * @returns string
 */
export const euiCantAnimate = (content: string) => `
@media screen and (prefers-reduced-motion: reduce) {
    ${content}
  }
`;

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

export type _EuiThemeAnimationSpeed = typeof EuiThemeAnimationSpeeds[number];

export type _EuiThemeAnimationSpeeds = Record<
  _EuiThemeAnimationSpeed,
  CSSProperties['animationDuration']
>;

/**
 * Easings / Timing functions
 */

export const EuiThemeAnimationEasings = ['bounce', 'resistance'] as const;

export type _EuiThemeAnimationEasing = typeof EuiThemeAnimationEasings[number];

export type _EuiThemeAnimationEasings = Record<
  _EuiThemeAnimationEasing,
  CSSProperties['animationTimingFunction']
>;

export type _EuiThemeAnimation = _EuiThemeAnimationEasings &
  _EuiThemeAnimationSpeeds;
