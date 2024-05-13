/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const EuiThemeShadowSizes = ['xs', 's', 'm', 'l', 'xl'] as const;

export type _EuiThemeShadowSize = (typeof EuiThemeShadowSizes)[number];

/**
 * Shadow t-shirt sizes descriptions
 */
export const _EuiShadowSizesDescriptions: Record<_EuiThemeShadowSize, string> =
  {
    xs: 'Very subtle shadow used on small components.',
    s: 'Adds subtle depth, usually used in conjunction with a border.',
    m: 'Used on small sized portalled content like popovers.',
    l: 'Primary shadow used in most cases to add visible depth.',
    xl: 'Very large shadows used for large portalled style containers like modals and flyouts.',
  };

export interface _EuiThemeShadowCustomColor {
  color?: string;
  property?: 'box-shadow' | 'filter';
}
