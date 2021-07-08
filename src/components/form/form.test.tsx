/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiForm } from './form';

describe('EuiForm', () => {
  test('is rendered', () => {
    const component = render(<EuiForm {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders a form element', () => {
    const component = render(<EuiForm {...requiredProps} component="form" />);

    expect(component).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true"', () => {
    const component = render(<EuiForm {...requiredProps} isInvalid />);

    expect(component).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true" and has one error', () => {
    const component = render(
      <EuiForm
        {...requiredProps}
        isInvalid
        error={<span>This is one error</span>}
      />
    );

    expect(component).toMatchSnapshot();
  });
  test('renders with error callout when isInvalid is "true" and has multiple errors', () => {
    const component = render(
      <EuiForm
        {...requiredProps}
        isInvalid
        error={[
          <span>This is one error</span>,
          <span>This is another error</span>,
        ]}
      />
    );

    expect(component).toMatchSnapshot();
  });
  test('renders without error callout when invalidCallout is "none"', () => {
    const component = render(
      <EuiForm {...requiredProps} isInvalid invalidCallout="none" />
    );

    expect(component).toMatchSnapshot();
  });
});
