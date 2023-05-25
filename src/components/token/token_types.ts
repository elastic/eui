/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';

export const SIZES = ['xs', 's', 'm', 'l'] as const;
export type TokenSize = (typeof SIZES)[number];

export const SHAPES = ['circle', 'square', 'rectangle'] as const;
export type TokenShape = (typeof SHAPES)[number];

export const FILLS = ['light', 'dark', 'none'] as const;
export type TokenFill = (typeof FILLS)[number];

export const COLORS = [
  'euiColorVis0',
  'euiColorVis1',
  'euiColorVis2',
  'euiColorVis3',
  'euiColorVis4',
  'euiColorVis5',
  'euiColorVis6',
  'euiColorVis7',
  'euiColorVis8',
  'euiColorVis9',
  'gray',
] as const;
export type TokenColor = (typeof COLORS)[number];

export interface TokenProps {
  /**
   * An EUI icon type
   */
  iconType: IconType;
  /**
   * For best results use one of the vis color names (or 'gray').
   * Or supply your own HEX color. The `fill='light'` (lightened background) will always be overridden by `fill='dark'` (solid background).
   * Default: `gray` for glyphs or one of the vis colors for prefab token types
   */
  color?: TokenColor | string;
  /**
   * Outer shape surrounding the icon
   * Default: `circle`
   */
  shape?: TokenShape;
  /**
   * `light` for lightened color with border, `dark` for solid, or `none`
   * Default: `light`
   */
  fill?: TokenFill;
  /**
   * Size of the token
   */
  size?: TokenSize;
  /**
   * The icon's title. Required for accessibility
   */
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export type EuiTokenProps = CommonProps &
  TokenProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'title'>;
