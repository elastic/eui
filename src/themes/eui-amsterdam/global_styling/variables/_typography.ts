/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { font } from '../../../../global_styling/variables/_typography';

/**
 * Amsterdam theme just changes the main font from the beta Inter UI to Inter
 */
export const font_ams = {
  ...font,
  family: "'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
};
