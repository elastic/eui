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
