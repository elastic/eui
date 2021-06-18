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
import { mount, shallow } from 'enzyme';

import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
} from './super_date_picker';
import { EuiButton } from '../../button';

const noop = () => {};

describe('EuiSuperDatePicker', () => {
  test('is rendered', () => {
    const component = shallow(<EuiSuperDatePicker onTimeChange={noop} />);

    expect(component).toMatchSnapshot();
  });

  test('refresh is disabled by default', () => {
    // By default we expect `asyncInterval` to be not set.
    const componentPaused = mount<EuiSuperDatePicker>(
      <EuiSuperDatePicker onTimeChange={noop} />
    );
    const instancePaused = componentPaused.instance();
    expect(instancePaused.asyncInterval).toBe(undefined);
    expect(componentPaused.prop('isPaused')).toBe(true);
  });

  test('updates refresh interval on isPaused prop update', () => {
    // If refresh is enabled via `isPaused/onRefresh` we expect
    // `asyncInterval` to be present and `asyncInterval.isStopped` to be `false`.
    const onRefresh = jest.fn();
    const componentRefresh = mount<EuiSuperDatePicker>(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
      />
    );
    const instanceRefresh = componentRefresh.instance();
    expect(typeof instanceRefresh.asyncInterval).toBe('object');
    expect(instanceRefresh.asyncInterval!.isStopped).toBe(false);
    expect(componentRefresh.prop('isPaused')).toBe(false);

    // If we update the prop `isPaused` we expect the interval to be stopped too.
    componentRefresh.setProps({ isPaused: true });
    const instanceUpdatedPaused = componentRefresh.instance();
    expect(typeof instanceUpdatedPaused.asyncInterval).toBe('object');
    expect(instanceUpdatedPaused.asyncInterval!.isStopped).toBe(true);
    expect(componentRefresh.prop('isPaused')).toBe(true);

    // Let's start refresh again for a final sanity check.
    componentRefresh.setProps({ isPaused: false });
    const instanceUpdatedRefresh = componentRefresh.instance();
    expect(typeof instanceUpdatedRefresh.asyncInterval).toBe('object');
    expect(instanceUpdatedRefresh.asyncInterval!.isStopped).toBe(false);
    expect(componentRefresh.prop('isPaused')).toBe(false);
  });

  test('Listen for consecutive super date picker refreshes', async () => {
    jest.useFakeTimers();

    const onRefresh = jest.fn();

    const componentRefresh = mount<EuiSuperDatePicker>(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
        refreshInterval={10}
      />
    );

    const instanceRefresh = componentRefresh.instance();
    expect(typeof instanceRefresh.asyncInterval).toBe('object');

    jest.advanceTimersByTime(10);
    await instanceRefresh.asyncInterval!.__pendingFn;
    jest.advanceTimersByTime(10);
    await instanceRefresh.asyncInterval!.__pendingFn;

    expect(onRefresh).toBeCalledTimes(2);

    jest.useRealTimers();
  });

  test('Switching refresh interval to pause should stop onRefresh being called.', async () => {
    jest.useFakeTimers();

    const onRefresh = jest.fn();

    const componentRefresh = mount<EuiSuperDatePicker>(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
        refreshInterval={10}
      />
    );

    const instanceRefresh = componentRefresh.instance();

    jest.advanceTimersByTime(10);
    expect(typeof instanceRefresh.asyncInterval).toBe('object');
    await instanceRefresh.asyncInterval!.__pendingFn;
    componentRefresh.setProps({ isPaused: true, refreshInterval: 0 });
    jest.advanceTimersByTime(10);
    await instanceRefresh.asyncInterval!.__pendingFn;

    expect(onRefresh).toBeCalledTimes(1);

    jest.useRealTimers();
  });

  test('updateButtonProps', () => {
    const updateButtonProps: EuiSuperDatePickerProps['updateButtonProps'] = {
      fill: false,
      color: 'ghost',
    };

    const component = mount(
      <EuiSuperDatePicker
        onTimeChange={noop}
        updateButtonProps={updateButtonProps}
      />
    );
    expect(component.find(EuiButton).props()).toMatchObject(updateButtonProps);
  });
});
