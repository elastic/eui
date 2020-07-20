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

import { EuiRangeTrack } from './range_track';

describe('EuiRangeTrack', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRangeTrack
        min={0}
        max={100}
        step={10}
        showTicks
        value="10"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('should throw error if `max` does not line up with `step` interval', () => {
    const component = () =>
      render(<EuiRangeTrack min={0} max={105} step={10} />);

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if there are too many ticks to render', () => {
    const component = () =>
      render(<EuiRangeTrack min={0} max={21} showTicks />);

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if `tickInterval` is off sequence from `step`', () => {
    const component = () =>
      render(
        <EuiRangeTrack min={0} max={100} step={10} showTicks tickInterval={3} />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if custom tick value is lower than `min`', () => {
    const component = () =>
      render(
        <EuiRangeTrack
          min={0}
          max={100}
          showTicks
          ticks={[{ label: '-100', value: -100 }]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if custom tick value is higher than `max`', () => {
    const component = () =>
      render(
        <EuiRangeTrack
          min={0}
          max={100}
          showTicks
          ticks={[{ label: '200', value: 200 }]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if custom tick value is off sequence from `step`', () => {
    const component = () =>
      render(
        <EuiRangeTrack
          min={0}
          max={100}
          step={50}
          showTicks
          ticks={[{ label: '10', value: 10 }]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
