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

import { EuiForm } from './form';

describe('EuiForm', () => {
  test('is rendered', () => {
    const { container } = render(<EuiForm {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a form element', () => {
    const { container } = render(
      <EuiForm {...requiredProps} component="form" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true"', () => {
    const { container } = render(<EuiForm {...requiredProps} isInvalid />);

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true" and has one error', () => {
    const { container } = render(
      <EuiForm
        {...requiredProps}
        isInvalid
        error={<span>This is one error</span>}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true" and has multiple errors', () => {
    const { container } = render(
      <EuiForm
        {...requiredProps}
        isInvalid
        error={[
          <span>This is one error</span>,
          <span>This is another error</span>,
        ]}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renders without error callout when invalidCallout is "none"', () => {
    const { container } = render(
      <EuiForm {...requiredProps} isInvalid invalidCallout="none" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
