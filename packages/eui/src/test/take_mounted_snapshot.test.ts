/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ReactWrapper } from 'enzyme';

import { takeMountedSnapshot } from './take_mounted_snapshot';

const mockWrapper = (html: string) =>
  ({ html: () => html } as unknown as ReactWrapper);

describe('takeMountedSnapshot', () => {
  it('returns the first rendered HTML node', () => {
    const snapshot = takeMountedSnapshot(
      mockWrapper('<div class="first"></div><span></span>')
    ) as HTMLElement;

    expect(snapshot.tagName).toEqual('DIV');
    expect(snapshot.className).toEqual('first');
  });

  it('returns every rendered HTML node when `hasArrayOutput` is set', () => {
    const snapshot = takeMountedSnapshot(
      mockWrapper('<div></div><span></span>'),
      { hasArrayOutput: true }
    ) as HTMLElement[];

    expect(snapshot.map(({ tagName }) => tagName)).toEqual(['DIV', 'SPAN']);
  });
});
