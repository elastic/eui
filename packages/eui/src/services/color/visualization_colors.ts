/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Array of color-blind safe colors to use in visualizations or other
// spots that need a large range of varied, qualitative colors.
import { euiPaletteColorBlind } from '../../services/color/eui_palettes';

/** @deprecated - use the data vis colors on `euiTheme.colors.vis` instead */
export const VISUALIZATION_COLORS = euiPaletteColorBlind();

/** @deprecated - use the data vis colors on `euiTheme.colors.vis` instead */
export const DEFAULT_VISUALIZATION_COLOR = VISUALIZATION_COLORS[1];
