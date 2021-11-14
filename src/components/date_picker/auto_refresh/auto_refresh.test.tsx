/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiAutoRefresh, EuiAutoRefreshButton } from './auto_refresh';

describe('EuiAutoRefresh', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAutoRefresh onRefreshChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isPaused is false', () => {
    const component = render(
      <EuiAutoRefresh isPaused={false} onRefreshChange={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  test('refreshInterval is rendered', () => {
    const component = render(
      <EuiAutoRefresh
        isPaused={false}
        refreshInterval={2000}
        onRefreshChange={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('EuiAutoRefreshButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAutoRefreshButton onRefreshChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isPaused is false', () => {
    const component = render(
      <EuiAutoRefreshButton isPaused={false} onRefreshChange={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  test('refreshInterval is rendered', () => {
    const component = render(
      <EuiAutoRefreshButton
        isPaused={false}
        refreshInterval={2000}
        onRefreshChange={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
