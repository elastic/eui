/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed, sizeToPixel } from '../../../../services/theme';
import {
  border,
  EuiThemeBorder,
} from '../../../../global_styling/variables/_borders';

export const border_ams: EuiThemeBorder = {
  ...border,
  radius: {
    medium: computed(sizeToPixel(0.375)),
    small: computed(sizeToPixel(0.25)),
  },
};
