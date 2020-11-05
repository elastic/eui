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

import { EuiProgress, COLORS, SIZES } from './progress';

describe('EuiProgress', () => {
  test('is rendered', () => {
    const component = render(<EuiProgress {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has max', () => {
    const component = render(<EuiProgress max={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has value', () => {
    const component = render(<EuiProgress value={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('is determinate', () => {
    const val = 50;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is indeterminate', () => {
    const val = undefined;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('has valueText and label', () => {
    const component = render(
      <EuiProgress
        valueText="150"
        label="Label"
        value={50}
        max={100}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('valueText is true', () => {
    const component = render(
      <EuiProgress valueText={true} value={50} max={100} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('has labelProps', () => {
    const component = render(
      <EuiProgress
        max={100}
        value={50}
        labelProps={{ title: 'Custom title' }}
        valueText="150"
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('color', () => {
    [...COLORS, '#885522'].forEach((color) => {
      test(`${color} is rendered`, () => {
        const component = render(<EuiProgress color={color} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiProgress size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
