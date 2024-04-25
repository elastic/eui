/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiFlyoutBody } from './flyout_body';

describe('EuiFlyoutBody', () => {
  test('is rendered', () => {
    const { container } = render(<EuiFlyoutBody {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('scrollableTabIndex', () => {
    const { container } = render(<EuiFlyoutBody scrollableTabIndex={-1} />);

    expect(container.querySelector('.euiFlyoutBody__overflow')).toHaveAttribute(
      'tabIndex',
      '-1'
    );
  });
});
