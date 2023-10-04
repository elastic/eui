/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiTextBlockTruncate } from './text_block_truncate';

describe('EuiTextBlockTruncate', () => {
  shouldRenderCustomStyles(<EuiTextBlockTruncate lines={3} />);

  it('renders', () => {
    const { container } = render(
      <EuiTextBlockTruncate lines={3}>Hello world</EuiTextBlockTruncate>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiTextBlockTruncate emotion-euiTextBlockTruncate"
      >
        Hello world
      </div>
    `);
  });

  it('allows cloning styles onto the child element instead of rendering an extra div wrapper', () => {
    const { container } = render(
      <EuiTextBlockTruncate lines={3} cloneElement={true}>
        <p className="test">Hello world</p>
      </EuiTextBlockTruncate>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <p
        class="test euiTextBlockTruncate emotion-euiTextBlockTruncate"
      >
        Hello world
      </p>
    `);
  });
});
