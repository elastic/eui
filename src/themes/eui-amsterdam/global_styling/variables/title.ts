/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 */

import {
  title,
  EuiThemeTitle,
} from '../../../../global_styling/variables/title';
import { SCALES } from '../../../../global_styling/variables/_typography';
import { computed } from '../../../../services/theme/utils';

// For Amsterdam, change all font-weights to bold and remove letter-spacing

export const title_ams: EuiThemeTitle = SCALES.reduce((acc, elem) => {
  acc[elem] = {
    ...title[elem],
    fontWeight: computed(([fontWeight]) => fontWeight, ['font.weight.bold']),
    letterSpacing: undefined,
  };
  return acc;
}, {} as EuiThemeTitle);
