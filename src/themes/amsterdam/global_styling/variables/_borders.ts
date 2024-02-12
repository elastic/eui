/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeBorder } from '../../../../global_styling/variables';
import { sizeToPixel } from '../../../../global_styling/functions';

import { computed } from '../../../../services/theme/utils';

export const border: _EuiThemeBorder = {
  color: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  width: {
    thin: '1px',
    thick: '2px',
  },
  radius: {
    medium: computed(sizeToPixel(0.375)),
    small: computed(sizeToPixel(0.25)),
  },
  thin: computed(
    ([width, color]) => `${width.thin} solid ${color}`,
    ['border.width', 'border.color']
  ),
  thick: computed(
    ([width, color]) => `${width.thick} solid ${color}`,
    ['border.width', 'border.color']
  ),
  editable: computed(
    ([width, color]) => `${width.thick} dotted ${color}`,
    ['border.width', 'border.color']
  ),
};
