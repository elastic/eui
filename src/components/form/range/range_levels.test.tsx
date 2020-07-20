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
import { requiredProps } from '../../../test/required_props';

import { EuiRangeLevels } from './range_levels';

describe('EuiRangeLevels', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRangeLevels
        min={0}
        max={100}
        showTicks
        levels={[
          {
            min: 0,
            max: 20,
            color: 'danger',
          },
          {
            min: 20,
            max: 100,
            color: 'success',
          },
        ]}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('should throw error if `level.min` is lower than `min`', () => {
    const component = () =>
      render(
        <EuiRangeLevels
          min={0}
          max={100}
          levels={[
            {
              min: -10,
              max: 20,
              color: 'danger',
            },
          ]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if `level.max` is higher than `max`', () => {
    const component = () =>
      render(
        <EuiRangeLevels
          min={0}
          max={100}
          levels={[
            {
              min: 20,
              max: 200,
              color: 'danger',
            },
          ]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
