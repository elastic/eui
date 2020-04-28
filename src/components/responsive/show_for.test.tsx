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

import {
  EuiShowForBreakpoints,
  EuiShowForDisplay,
  EuiShowFor,
} from './show_for';

const BREAKPOINTS: EuiShowForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];
const DISPLAYS: EuiShowForDisplay[] = ['block', 'inlineBlock', 'flex'];

describe('EuiShowFor', () => {
  test('renders wraps children in a span', () => {
    const component = render(
      <EuiShowFor sizes={['xs']} {...requiredProps}>
        Child
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders and copies classes', () => {
    const component = render(
      <EuiShowFor sizes={['xs']}>
        <div>Child</div>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(<EuiShowFor sizes={[size]} />);

      expect(component).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const component = render(
      <EuiShowFor sizes={['xs', 'l']}>Child</EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  DISPLAYS.forEach(display => {
    test(`${display} is rendered`, () => {
      const component = render(<EuiShowFor sizes={['xs']} display={display} />);

      expect(component).toMatchSnapshot();
    });
  });
});
