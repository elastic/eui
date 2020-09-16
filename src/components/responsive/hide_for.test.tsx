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

import { EuiHideForBreakpoints, EuiHideFor } from './hide_for';

const BREAKPOINTS: EuiHideForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiHideFor', () => {
  // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
  beforeAll(() => (window.innerWidth = 670));
  afterAll(() => 1024); // reset to jsdom's default

  test('renders', () => {
    const component = render(
      <EuiHideFor sizes={['s']}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]}>
          <span>Child</span>
        </EuiHideFor>
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const component = render(
      <EuiHideFor sizes={['s', 'l']}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders for "none"', () => {
    const component = render(
      <EuiHideFor sizes={'none'}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('never renders for "all"', () => {
    const component = render(
      <EuiHideFor sizes={'all'}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });
});
