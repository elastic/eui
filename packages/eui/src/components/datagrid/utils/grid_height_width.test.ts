/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getVirtualizeContainerContentWidth } from './grid_height_width';

describe('getVirtualizeContainerContentWidth', () => {
  it('rounds the fractional content width down instead of using the rounded clientWidth', () => {
    // A 729.625px content box reports a clientWidth of 730px
    expect(getVirtualizeContainerContentWidth(729.625, 730)).toEqual(729);
  });

  it('rounds down when a zoomed scroll bar leaves a fractional content width', () => {
    // 500.4px container minus a 13.64px scroll bar at 110% zoom
    expect(getVirtualizeContainerContentWidth(486.76, 487)).toEqual(486);
  });

  it('falls back to clientWidth before the content-box width is known', () => {
    expect(getVirtualizeContainerContentWidth(0, 486)).toEqual(486);
  });
});
