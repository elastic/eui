/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, cx } from './css';

describe('custom EUI Emotion instance', () => {
  it("creates a vanilla JS className that contains styles with EUI's custom configuration", () => {
    const test = css`
      display: flex;
    `;
    expect(test).toEqual('css-vyoujf');

    // Should not have any extra browser prefixes, per EUI's configuration
    const styleOutput = document.head.querySelector('style[data-emotion]')!;
    expect(styleOutput.textContent).toEqual('.css-vyoujf{display:flex;}');
  });

  // NOTE: Currently, custom Emotion instances do *not* merge css auto labels
  // @see https://github.com/emotion-js/emotion/issues/3113
  it('correctly merges css with labels', () => {
    const test1 = css`
      label: hello;
      color: red;
    `;
    const test2 = css`
      label: world;
      background-color: blue;
    `;
    expect(cx(test1, test2)).toEqual('css-4dyepw-hello-world');
  });
});
