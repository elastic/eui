/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RecursivePartial } from '../../types';
import {
  EUI_THEME_HIGH_CONTRAST_MODE_KEY,
  type EuiThemeShapeBase,
} from '../../services/theme/types';

/**
 * Theme specific conditional overrides, e.g. for high contrast mode
 */
export type _EuiThemeOverrides = {
  [EUI_THEME_HIGH_CONTRAST_MODE_KEY]: RecursivePartial<EuiThemeShapeBase>;
};
