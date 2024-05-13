/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiTitle } from './title';

describe('EuiTitle', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiTitle {...requiredProps}>
        <h1>Title</h1>
      </EuiTitle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(
    <EuiTitle>
      <h1>Title</h1>
    </EuiTitle>
  );

  test('renders children element className', () => {
    const { container } = render(
      <EuiTitle {...requiredProps}>
        <h1 className="test">Title</h1>
      </EuiTitle>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
