/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiAutoRefresh, EuiAutoRefreshButton } from './auto_refresh';

describe('EuiAutoRefresh', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiAutoRefresh onRefreshChange={() => {}} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('isPaused is false', () => {
    const { container } = render(
      <EuiAutoRefresh isPaused={false} onRefreshChange={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('refreshInterval is rendered', () => {
    const { container } = render(
      <EuiAutoRefresh
        isPaused={false}
        refreshInterval={2000}
        onRefreshChange={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('minInterval renders an invalid warning on the number input', () => {
    const onRefreshChange = jest.fn();
    const { getByRole, getByTestSubject } = render(
      <EuiAutoRefresh
        isPaused={false}
        refreshInterval={1000}
        minInterval={3000}
        onRefreshChange={onRefreshChange}
      />
    );
    const getNumberInput = () =>
      getByTestSubject('superDatePickerRefreshIntervalInput');
    const getUnitSelect = () =>
      getByTestSubject('superDatePickerRefreshIntervalUnitsSelect');

    fireEvent.click(getByRole('button'));
    expect(getNumberInput()).toBeInvalid();

    fireEvent.change(getUnitSelect(), { target: { value: 'm' } });
    expect(onRefreshChange).toHaveBeenLastCalledWith({
      refreshInterval: 60000,
      intervalUnits: 'm',
      isPaused: false,
    });
    expect(getNumberInput()).toBeValid();

    fireEvent.change(getUnitSelect(), { target: { value: 's' } });
    expect(onRefreshChange).toHaveBeenLastCalledWith({
      refreshInterval: 3000, // Should pass back the minimum instead of the current 1000 value
      intervalUnits: 's',
      isPaused: false,
    });
    expect(getNumberInput()).toBeInvalid();

    fireEvent.change(getNumberInput(), { target: { value: 5 } });
    expect(onRefreshChange).toHaveBeenLastCalledWith({
      refreshInterval: 5000,
      intervalUnits: 's',
      isPaused: false,
    });
    expect(getNumberInput()).toBeValid();
  });

  test('intervalUnits forces rendering in the provided units', () => {
    const { getByLabelText, getByRole, getByTestSubject } = render(
      <EuiAutoRefresh
        isPaused={false}
        refreshInterval={200000}
        intervalUnits="s"
        onRefreshChange={() => {}}
      />
    );

    expect(getByLabelText('Auto refresh')).toHaveValue('200 seconds');

    fireEvent.click(getByRole('button'));
    expect(getByTestSubject('superDatePickerRefreshIntervalInput')).toHaveValue(
      200
    );
    expect(
      getByTestSubject('superDatePickerRefreshIntervalUnitsSelect')
    ).toHaveValue('s');
  });

  test('onRefreshChange passes back all expected values', () => {
    const onRefreshChange = jest.fn();
    const { getByLabelText, getByTestSubject } = render(
      <EuiAutoRefresh
        isPaused={false}
        refreshInterval={1000}
        onRefreshChange={onRefreshChange}
      />
    );

    fireEvent.click(getByLabelText('Auto refresh'));
    fireEvent.change(
      getByTestSubject('superDatePickerRefreshIntervalUnitsSelect'),
      { target: { value: 'h' } }
    );

    expect(onRefreshChange).toHaveBeenCalledWith({
      refreshInterval: 3600000,
      intervalUnits: 'h',
      isPaused: false,
    });
  });
});

describe('EuiAutoRefreshButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiAutoRefreshButton onRefreshChange={() => {}} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('isPaused is false', () => {
    const { container } = render(
      <EuiAutoRefreshButton isPaused={false} onRefreshChange={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('refreshInterval is rendered', () => {
    const { container } = render(
      <EuiAutoRefreshButton
        isPaused={false}
        refreshInterval={2000}
        onRefreshChange={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('intervalUnits forces rendering in the provided units', () => {
    const { getByRole, getByTestSubject } = render(
      <EuiAutoRefreshButton
        isPaused={false}
        refreshInterval={200000}
        intervalUnits="s"
        onRefreshChange={() => {}}
      />
    );

    expect(getByRole('button')).toHaveTextContent('200 s');

    fireEvent.click(getByRole('button'));
    expect(getByTestSubject('superDatePickerRefreshIntervalInput')).toHaveValue(
      200
    );
    expect(
      getByTestSubject('superDatePickerRefreshIntervalUnitsSelect')
    ).toHaveValue('s');
  });

  test('onRefreshChange passes back all expected values', () => {
    const onRefreshChange = jest.fn();
    const { getByRole, getByTestSubject } = render(
      <EuiAutoRefreshButton
        isPaused={false}
        refreshInterval={1000}
        onRefreshChange={onRefreshChange}
      />
    );

    fireEvent.click(getByRole('button'));
    fireEvent.change(
      getByTestSubject('superDatePickerRefreshIntervalUnitsSelect'),
      { target: { value: 'h' } }
    );

    expect(onRefreshChange).toHaveBeenCalledWith({
      refreshInterval: 3600000,
      intervalUnits: 'h',
      isPaused: false,
    });
  });
});
