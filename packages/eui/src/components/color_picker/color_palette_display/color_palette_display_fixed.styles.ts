/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalCSS } from '../../../global_styling';

// In a few screen sizes the palette display doesn't get a fully 100% width -
// it gets 1px less on width. For this reason we're adding a horizontal 1px bleed area
export const euiColorPaletteDisplayFixed__bleedArea = css`
  position: absolute;
  inset: 0;
  ${logicalCSS('right', '-1px')}
  display: flex;
`;
