/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../../../services/theme/utils';
import {
  border,
  EuiThemeBorder,
} from '../../../../global_styling/variables/_borders';
import { sizeToPixel } from '../../../../global_styling/variables/_size';

export const border_ams: EuiThemeBorder = {
  ...border,
  radius: computed(sizeToPixel(0.375)),
  radiusSmall: computed(sizeToPixel(0.25)),
};
