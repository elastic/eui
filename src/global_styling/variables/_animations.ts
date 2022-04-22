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

export interface _EuiThemeAnimationSpeed {
  extraFast: CSSProperties['animationDuration'];
  fast: CSSProperties['animationDuration'];
  normal: CSSProperties['animationDuration'];
  slow: CSSProperties['animationDuration'];
  extraSlow: CSSProperties['animationDuration'];
}
export interface _EuiThemeAnimationEasing {
  bounce: CSSProperties['animationTimingFunction'];
  resistance: CSSProperties['animationTimingFunction'];
}

export type EuiThemeAnimation = _EuiThemeAnimationEasing &
  _EuiThemeAnimationSpeed;

export const animation_speed: _EuiThemeAnimationSpeed = {
  extraFast: '90ms',
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  extraSlow: '500ms',
};

export const animation_ease: _EuiThemeAnimationEasing = {
  bounce: 'cubic-bezier(.34, 1.61, .7, 1)',
  resistance: 'cubic-bezier(.694, .0482, .335, 1)',
};

export const animation: EuiThemeAnimation = {
  ...animation_speed,
  ...animation_ease,
};
