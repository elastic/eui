/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { fireEvent } from '@testing-library/react';
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
  // RTL doesn't automatically clean up portals/datepicker popovers between tests
  afterEach(() => {
    const portals = document.querySelectorAll('[data-euiportal]');
    portals.forEach((portal) => portal.parentNode?.removeChild(portal));
  });

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

    describe('refreshInterval and refreshIntervalUnits', () => {
      it('renders', () => {
        const { container, getByTestSubject } = render(
          <EuiSuperDatePicker
            onTimeChange={noop}
            onRefreshChange={noop}
            refreshInterval={3600000}
            refreshIntervalUnits="m"
            isPaused={false}
          />
        );

        const autoRefreshButton = container.querySelector(
          '.euiAutoRefreshButton'
        )!;
        expect(autoRefreshButton).toHaveTextContent('60 m');

        fireEvent.click(autoRefreshButton);
        expect(
          getByTestSubject('superDatePickerRefreshIntervalInput')
        ).toHaveValue(60);
        expect(
          getByTestSubject('superDatePickerRefreshIntervalUnitsSelect')
        ).toHaveValue('m');
      });
    });

    describe('onRefreshChange', () => {
      it('returns the expected props', () => {
        const onRefreshChange = jest.fn();
        const { getByTestSubject } = render(
          <EuiSuperDatePicker
            onTimeChange={noop}
            onRefreshChange={onRefreshChange}
          />
        );

        fireEvent.click(
          getByTestSubject('superDatePickerToggleQuickMenuButton')
        );
        fireEvent.change(
          getByTestSubject('superDatePickerToggleRefreshButton')
        );
        fireEvent.change(
          getByTestSubject('superDatePickerRefreshIntervalUnitsSelect'),
          { target: { value: 'h' } }
        );

        expect(onRefreshChange).toHaveBeenCalledWith({
          refreshInterval: 3600000,
          intervalUnits: 'h',
          isPaused: expect.any(Boolean),
        });
      });
    });

    describe('canRoundRelativeUnits', () => {
      const props = {
        onTimeChange: noop,
        start: 'now-300m',
        end: 'now',
      };

      it('defaults to true, which will round relative units up to the next largest unit', () => {
        const { getByTestSubject } = render(
          <EuiSuperDatePicker {...props} canRoundRelativeUnits={true} />
        );
        fireEvent.click(getByTestSubject('superDatePickerShowDatesButton'));

        const startButton = getByTestSubject(
          'superDatePickerstartDatePopoverButton'
        );
        expect(startButton).toHaveTextContent('~ 5 hours ago');

        const countInput = getByTestSubject(
          'superDatePickerRelativeDateInputNumber'
        );
        expect(countInput).toHaveValue(5);

        const unitSelect = getByTestSubject(
          'superDatePickerRelativeDateInputUnitSelector'
        );
        expect(unitSelect).toHaveValue('h');

        fireEvent.change(countInput, { target: { value: 300 } });
        fireEvent.change(unitSelect, { target: { value: 'd' } });
        expect(startButton).toHaveTextContent('~ 10 months ago');
      });

      it('when false, allows preserving the unit set in the start/end time timestamp', () => {
        const { getByTestSubject } = render(
          <EuiSuperDatePicker {...props} canRoundRelativeUnits={false} />
        );
        fireEvent.click(getByTestSubject('superDatePickerShowDatesButton'));

        const startButton = getByTestSubject(
          'superDatePickerstartDatePopoverButton'
        );
        expect(startButton).toHaveTextContent('300 minutes ago');

        const unitSelect = getByTestSubject(
          'superDatePickerRelativeDateInputUnitSelector'
        );
        expect(unitSelect).toHaveValue('m');

        fireEvent.change(unitSelect, { target: { value: 'd' } });
        expect(startButton).toHaveTextContent('300 days ago');
      });
    });
  });
});
