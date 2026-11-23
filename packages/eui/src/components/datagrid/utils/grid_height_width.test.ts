/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getVirtualizeContainerContentWidth } from './grid_height_width';

const mockContainer = (offsetWidth: number, clientWidth: number) =>
  ({ offsetWidth, clientWidth } as HTMLDivElement);

describe('getVirtualizeContainerContentWidth', () => {
  it('rounds the fractional content width down instead of using the rounded clientWidth', () => {
    // 740.625px scroller with an 11px vertical scroll bar: the real content
    // width is 729.625px, while clientWidth rounds it up to 730px
    expect(
      getVirtualizeContainerContentWidth(mockContainer(741, 730), 740.625)
    ).toEqual(729);
  });

  it('rounds the width down when there is no vertical scroll bar', () => {
    expect(
      getVirtualizeContainerContentWidth(mockContainer(501, 501), 500.6)
    ).toEqual(500);
  });

  it('falls back to clientWidth before the border-box width is known', () => {
    expect(
      getVirtualizeContainerContentWidth(mockContainer(501, 486), 0)
    ).toEqual(486);
  });
});
