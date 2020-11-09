/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
