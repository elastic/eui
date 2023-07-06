/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { fireEvent } from '@testing-library/dom';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  EuiSuperDatePickerInternal,
} from './super_date_picker';
import { EuiButton } from '../../button';

const noop = () => {};

// Test utils to handle diving into EuiSuperDatePickerInternal
const findInternalInstance = (
  wrapper: ReactWrapper
): [EuiSuperDatePickerInternal, ReactWrapper] => {
  const component = wrapper.find('EuiSuperDatePickerInternal');
  const instance = component.instance() as EuiSuperDatePickerInternal;
  return [instance, component];
};

describe('EuiSuperDatePicker', () => {
  shouldRenderCustomStyles(<EuiSuperDatePicker onTimeChange={noop} />, {
    skip: { style: true },
  });
  shouldRenderCustomStyles(<EuiSuperDatePicker onTimeChange={noop} />, {
    childProps: ['updateButtonProps'],
    skip: { parentTest: true },
  });

  it('renders', () => {
    const { container } = render(
      <EuiSuperDatePicker onTimeChange={noop} {...requiredProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an EuiDatePickerRange', () => {
    const { container, getByTestSubject } = render(
      <EuiSuperDatePicker onTimeChange={noop} {...requiredProps} />
    );
    fireEvent.click(getByTestSubject('superDatePickerShowDatesButton'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('refresh is disabled by default', () => {
    // By default we expect `asyncInterval` to be not set.
    const component = mount(<EuiSuperDatePicker onTimeChange={noop} />);
    const [instancePaused, componentPaused] = findInternalInstance(component);

    expect(instancePaused.asyncInterval).toBe(undefined);
    expect(componentPaused.prop('isPaused')).toBe(true);
  });

  test('updates refresh interval on isPaused prop update', () => {
    // If refresh is enabled via `isPaused/onRefresh` we expect
    // `asyncInterval` to be present and `asyncInterval.isStopped` to be `false`.
    const onRefresh = jest.fn();
    const component = mount(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
      />
    );
    const [instanceRefresh, componentRefresh] = findInternalInstance(component);

    expect(typeof instanceRefresh.asyncInterval).toBe('object');
    expect(instanceRefresh.asyncInterval!.isStopped).toBe(false);
    expect(componentRefresh.prop('isPaused')).toBe(false);

    // If we update the prop `isPaused` we expect the interval to be stopped too.
    component.setProps({ isPaused: true });
    const [instanceUpdatedPaused, componentUpdatedPaused] =
      findInternalInstance(component);
    expect(typeof instanceUpdatedPaused.asyncInterval).toBe('object');
    expect(instanceUpdatedPaused.asyncInterval!.isStopped).toBe(true);
    expect(componentUpdatedPaused.prop('isPaused')).toBe(true);

    // Let's start refresh again for a final sanity check.
    component.setProps({ isPaused: false });
    const [instanceUpdatedRefresh, componentUpdatedRefresh] =
      findInternalInstance(component);
    expect(typeof instanceUpdatedRefresh.asyncInterval).toBe('object');
    expect(instanceUpdatedRefresh.asyncInterval!.isStopped).toBe(false);
    expect(componentUpdatedRefresh.prop('isPaused')).toBe(false);
  });

  test('Listen for consecutive super date picker refreshes', async () => {
    jest.useFakeTimers();

    const onRefresh = jest.fn();

    const component = mount(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
        refreshInterval={10}
      />
    );
    const [instanceRefresh] = findInternalInstance(component);

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

    const component = mount(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
        refreshInterval={10}
      />
    );
    const [instanceRefresh] = findInternalInstance(component);

    jest.advanceTimersByTime(10);
    expect(typeof instanceRefresh.asyncInterval).toBe('object');
    await instanceRefresh.asyncInterval!.__pendingFn;
    component.setProps({ isPaused: true, refreshInterval: 0 });
    jest.advanceTimersByTime(10);
    await instanceRefresh.asyncInterval!.__pendingFn;

    expect(onRefresh).toBeCalledTimes(1);

    jest.useRealTimers();
  });

  describe('props', () => {
    test('updateButtonProps', () => {
      const updateButtonProps: EuiSuperDatePickerProps['updateButtonProps'] = {
        fill: false,
        color: 'danger',
      };

      const component = mount(
        <EuiSuperDatePicker
          onTimeChange={noop}
          updateButtonProps={updateButtonProps}
        />
      );
      expect(component.find(EuiButton).last().props()).toMatchObject(
        updateButtonProps
      );
    });

    it('invokes onFocus callbacks on the date popover buttons', () => {
      const focusMock = jest.fn();
      const component = mount(
        <EuiSuperDatePicker
          onTimeChange={noop}
          showUpdateButton={false}
          onFocus={focusMock}
        />
      );

      component
        .find('button[data-test-subj="superDatePickerShowDatesButton"]')
        .simulate('focus');
      expect(focusMock).toBeCalledTimes(1);

      component
        .find('button[data-test-subj="superDatePickerShowDatesButton"]')
        .simulate('click');

      component
        .find('button[data-test-subj="superDatePickerstartDatePopoverButton"]')
        .simulate('focus');
      expect(focusMock).toBeCalledTimes(2);

      component
        .find('button[data-test-subj="superDatePickerstartDatePopoverButton"]')
        .simulate('focus');
      expect(focusMock).toBeCalledTimes(3);
    });

    describe('showUpdateButton', () => {
      test('can be false', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} showUpdateButton={false} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be iconOnly', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} showUpdateButton="iconOnly" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('accepts data-test-subj and passes to EuiFormControlLayout', () => {
      const { container } = render(
        <EuiSuperDatePicker
          onTimeChange={noop}
          data-test-subj="mySuperDatePicker"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    describe('width', () => {
      test('can be full', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} width="full" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
      test('can be auto', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} width="auto" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} compressed />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isQuickSelectOnly', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} isQuickSelectOnly />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true', () => {
        const { container } = render(
          <EuiSuperDatePicker onTimeChange={noop} isDisabled={true} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      // TODO: Convert to storybook once EuiSuperDatePicker is on Emotion
      test('config object', () => {
        const { getByTestSubject } = render(
          <EuiSuperDatePicker
            onTimeChange={noop}
            isDisabled={{
              display: (
                <span data-test-subj="customDisabledDisplay">All time</span>
              ),
            }}
          />
        );
        expect(getByTestSubject('customDisabledDisplay').textContent).toEqual(
          'All time'
        );
        expect(
          getByTestSubject('superDatePickerShowDatesButton')
        ).toMatchSnapshot();
      });
    });

    describe('isAutoRefreshOnly', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiSuperDatePicker
            onTimeChange={noop}
            onRefreshChange={noop}
            isAutoRefreshOnly
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it('passes required props', () => {
        const { container } = render(
          <EuiSuperDatePicker
            onTimeChange={noop}
            onRefreshChange={noop}
            isAutoRefreshOnly
            isDisabled
            data-test-subj="autoRefreshOnly"
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
