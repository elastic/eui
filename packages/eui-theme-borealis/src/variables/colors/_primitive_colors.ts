/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import tokens from '@elastic/design-tokens/dist/ts/light-all.json';

/**
 * Primitive colors that are still used directly by theme value files
 * because they lack semantic-level design tokens.
 *
 * TODO: These should be replaced by proper semantic tokens in
 * @elastic/design-tokens. Once that's done, consumers should import
 * from SEMANTIC_COLORS (or the design tokens JSON) and this file
 * can be deleted.
 *
 * Current usages:
 * - `black`  → shadow base color (_shadows.ts, _colors_light.ts, _colors_dark.ts)
 *            → HCM overrides for textInk, plainDark (_overrides.ts)
 * - `white`  → HCM overrides for textGhost, plainLight (_overrides.ts)
 * - `transparent` → legacy backgroundTransparent (_colors_light.ts, _colors_dark.ts)
 *                 → borderBaseFloating in light mode (_colors_light.ts)
 */
export const PRIMITIVE_COLORS = {
  white: tokens.core.color.white,
  black: tokens.core.color.black,
  transparent: 'transparent',
};
