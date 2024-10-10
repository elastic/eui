/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
} from './super_date_picker';
import moment from 'moment';

const noop = () => {};

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
    const { container } = render(<EuiSuperDatePicker onTimeChange={noop} />);

    expect(
      container.querySelector('.euiAutoRefreshButton')
    ).not.toBeInTheDocument();
  });

  test('updates refresh interval on isPaused prop update', () => {
    const onRefresh = jest.fn();
    const { container } = render(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
      />
    );
    const refreshButton = container.querySelector('.euiAutoRefreshButton');

    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveTextContent('1 s');
  });

  test('Listen for consecutive super date picker refreshes', async () => {
    jest.useFakeTimers();

    const onRefresh = jest.fn();

    render(
      <EuiSuperDatePicker
        onTimeChange={noop}
        isPaused={false}
        onRefresh={onRefresh}
        refreshInterval={10}
      />
    );

    jest.advanceTimersByTime(10);
    await jest.runAllTicks();
    expect(onRefresh).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(10);
    await jest.runAllTicks();
    expect(onRefresh).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  test('Switching refresh interval to pause should stop onRefresh being called.', async () => {
    jest.useFakeTimers();

    const onRefresh = jest.fn();

    const { rerender } = render(
      <EuiSuperDatePicker
        onTimeChange={noop}
        onRefresh={onRefresh}
        isPaused={false}
        refreshInterval={10}
      />
    );

    jest.advanceTimersByTime(10);
    await jest.runAllTicks();
    expect(onRefresh).toHaveBeenCalledTimes(1);

    rerender(
      <EuiSuperDatePicker
        onTimeChange={noop}
        onRefresh={onRefresh}
        isPaused={true}
        refreshInterval={0}
      />
    );

    jest.advanceTimersByTime(10);
    await jest.runAllTicks();
    expect(onRefresh).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  describe('props', () => {
    test('updateButtonProps', () => {
      const updateButtonProps: EuiSuperDatePickerProps['updateButtonProps'] = {
        fill: false,
        color: 'danger',
      };

      const { container } = render(
        <EuiSuperDatePicker
          onTimeChange={noop}
          updateButtonProps={updateButtonProps}
        />
      );
      const updateButton = container.querySelector('.euiSuperUpdateButton')!;
      expect(updateButton.className).not.toContain('fill');
      expect(updateButton.className).toContain('danger');
    });

    it('invokes onFocus callbacks on the date popover buttons', () => {
      const focusMock = jest.fn();
      const { getByTestSubject } = render(
        <EuiSuperDatePicker
          onTimeChange={noop}
          showUpdateButton={false}
          onFocus={focusMock}
        />
      );

      fireEvent.focus(getByTestSubject('superDatePickerShowDatesButton'));
      expect(focusMock).toHaveBeenCalledTimes(1);

      fireEvent.click(getByTestSubject('superDatePickerShowDatesButton'));

      fireEvent.focus(
        getByTestSubject('superDatePickerstartDatePopoverButton')
      );
      expect(focusMock).toHaveBeenCalledTimes(2);

      fireEvent.focus(getByTestSubject('superDatePickerendDatePopoverButton'));
      expect(focusMock).toHaveBeenCalledTimes(3);
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

    describe('minDate', () => {
      const props = {
        onTimeChange: noop,
        end: 'now',
      };

      it('is valid when the start value is set after the minDate', () => {
        const { container } = render(
          <EuiSuperDatePicker
            {...props}
            start="10/01/2024"
            minDate={moment('10/01/2024')}
          />
        );

        const formWraper = container.querySelector(
          '.euiFormControlLayout__childrenWrapper'
        )!;

        expect(formWraper.className).not.toContain('invalid');
      });

      it('is invalid when the start value is set before the minDate', () => {
        const { container } = render(
          <EuiSuperDatePicker
            {...props}
            start="09/30/2024"
            minDate={moment('10/01/2024')}
          />
        );

        const formWraper = container.querySelector(
          '.euiFormControlLayout__childrenWrapper'
        )!;

        expect(formWraper.className).toContain('invalid');
      });
    });

    describe('maxDate', () => {
      const props = {
        onTimeChange: noop,
        start: '10/01/2024',
      };

      it('is valid when the end value is set before the maxDate', () => {
        const { container } = render(
          <EuiSuperDatePicker
            {...props}
            end="10/31/2024"
            maxDate={moment('11/01/2024')}
          />
        );

        const formWraper = container.querySelector(
          '.euiFormControlLayout__childrenWrapper'
        )!;

        expect(formWraper.className).not.toContain('invalid');
      });

      it('is invalid when the end date exceeds the maxDate', () => {
        const { container } = render(
          <EuiSuperDatePicker
            {...props}
            end="11/02/2024"
            maxDate={moment('11/01/2024')}
          />
        );

        const formWraper = container.querySelector(
          '.euiFormControlLayout__childrenWrapper'
        )!;

        expect(formWraper.className).toContain('invalid');
      });
    });
  });
});
