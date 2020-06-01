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
import { requiredProps } from '../../test';

import { EuiHideForBreakpoints, EuiHideFor } from './hide_for';

const BREAKPOINTS: EuiHideForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiHideFor', () => {
  test('renders wraps children in a span', () => {
    const component = render(
      <EuiHideFor sizes={['xs']} {...requiredProps}>
        Child
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders and copies classes', () => {
    const component = render(
      <EuiHideFor sizes={['xs']}>
        <div>Child</div>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const component = render(
      <EuiHideFor sizes={['xs', 'l']}>Child</EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });
});
