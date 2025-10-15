/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { render as renderBase } from '@testing-library/react';
import { requiredProps } from '../../../test/required_props';
import {
  EuiFlyoutManager,
  EuiFlyoutManagerContext,
  useFlyoutManager,
} from './provider';
import { _resetFlyoutManagerStore } from './store';

describe('EuiFlyoutManager', () => {
  afterEach(_resetFlyoutManagerStore);

  it('renders', () => {
    const { container } = render(
      <EuiFlyoutManager {...requiredProps}>
        <div />
      </EuiFlyoutManager>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('provides context value to children', () => {
    const TestComponent = () => {
      const context = useFlyoutManager();
      return (
        <div data-test-subj="context-value">
          {context ? 'Context Available' : 'No Context'}
        </div>
      );
    };

    const { getByTestSubject } = render(
      <EuiFlyoutManager>
        <TestComponent />
      </EuiFlyoutManager>
    );

    expect(getByTestSubject('context-value')).toHaveTextContent(
      'Context Available'
    );
  });
});

describe('useFlyoutManager', () => {
  it('returns null when used outside of provider', () => {
    const TestComponent = () => {
      const context = useFlyoutManager();
      return (
        <div data-testid="hook-test">
          {context ? 'Hook Context Available' : 'No Hook Context'}
        </div>
      );
    };

    // Use regular render to avoid EUI provider wrapper
    const { getByTestId } = renderBase(<TestComponent />);

    expect(getByTestId('hook-test')).toHaveTextContent('No Hook Context');
  });
});

describe('EuiFlyoutManagerContext', () => {
  it('is a valid React context', () => {
    expect(EuiFlyoutManagerContext.Provider).toBeDefined();
    expect(EuiFlyoutManagerContext.Consumer).toBeDefined();
  });
});
