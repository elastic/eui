import React from 'react';
import { mount, shallow } from 'enzyme';

import { EuiSuperDatePicker } from './super_date_picker';

const noop = () => {};

describe('EuiSuperDatePicker', () => {
  test('is rendered', () => {
    const component = shallow(<EuiSuperDatePicker onTimeChange={noop} />);

    expect(component).toMatchSnapshot();
  });

  test('refresh is disabled by default', () => {
    // By default we expect `asyncInterval` to be not set.
    const componentPaused = mount(<EuiSuperDatePicker onTimeChange={noop} />);
    const instancePaused = componentPaused.instance();
    expect(instancePaused.asyncInterval).toBe(undefined);
    expect(componentPaused.prop('isPaused')).toBe(true);
  });

  test('updates refresh interval on isPaused prop update', () => {
    // If refresh is enabled via `isPaused/onRefresh` we expect
    // `asyncInterval` to be present and `asyncInterval.isStopped` to be `false`.
    const onRefresh = jest.fn();
    const componentRefresh = mount(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
      />
    );
    const instanceRefresh = componentRefresh.instance();
    expect(typeof instanceRefresh.asyncInterval).toBe('object');
    expect(instanceRefresh.asyncInterval.isStopped).toBe(false);
    expect(componentRefresh.prop('isPaused')).toBe(false);

    // If we update the prop `isPaused` we expect the interval to be stopped too.
    componentRefresh.setProps({ isPaused: true });
    const instanceUpdatedPaused = componentRefresh.instance();
    expect(typeof instanceUpdatedPaused.asyncInterval).toBe('object');
    expect(instanceUpdatedPaused.asyncInterval.isStopped).toBe(true);
    expect(componentRefresh.prop('isPaused')).toBe(true);

    // Let's start refresh again for a final sanity check.
    componentRefresh.setProps({ isPaused: false });
    const instanceUpdatedRefresh = componentRefresh.instance();
    expect(typeof instanceUpdatedRefresh.asyncInterval).toBe('object');
    expect(instanceUpdatedRefresh.asyncInterval.isStopped).toBe(false);
    expect(componentRefresh.prop('isPaused')).toBe(false);
  });
});
