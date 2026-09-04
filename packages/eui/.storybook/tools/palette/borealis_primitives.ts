/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PRIMITIVE_COLORS } from '../../../../eui-theme-borealis/src/variables/colors/_primitive_colors';

export { PRIMITIVE_COLORS };

export type BorealisPrimitiveName = keyof typeof PRIMITIVE_COLORS;

export const BOREALIS_VIS_PALETTE = [
  'teal60',
  'teal30',
  'blue60',
  'blue30',
  'pink60',
  'pink30',
  'red60',
  'red30',
  'yellow60',
  'yellow30',
] as const satisfies readonly BorealisPrimitiveName[];
