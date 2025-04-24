/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  computed,
  type _EuiThemeBorder,
  sizeToPixel,
} from '@elastic/eui-theme-common';

export const border: _EuiThemeBorder = {
  color: computed(
    ([borderBaseSubdued]) => borderBaseSubdued,
    ['colors.borderBaseSubdued']
  ),
  width: {
    thin: '1px',
    thick: '2px',
  },
  radius: {
    medium: computed(sizeToPixel(0.25)),
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
