/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { act } from '@testing-library/react';
import { requiredProps } from '../../../test/required_props';
import { EuiFlyoutIsManagedProvider, useIsInManagedFlyout } from './context';
import { getFlyoutManagerStore, _resetFlyoutManagerStore } from './store';

describe('EuiFlyoutIsManagedProvider', () => {
  // Clean up the singleton store before each test
  beforeEach(() => {
    _resetFlyoutManagerStore();
  });

  it('renders', () => {
    const { container } = render(
      <EuiFlyoutIsManagedProvider isManaged={true} {...requiredProps}>
        <div />
      </EuiFlyoutIsManagedProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('useIsInManagedFlyout hook (store-based)', () => {
    it('returns false when no managed flyout sessions exist', () => {
      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="hook-test">{isManaged ? 'True' : 'False'}</div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);

      expect(getByTestSubject('hook-test')).toHaveTextContent('False');
    });

    it('returns true when a managed flyout session exists in the store', () => {
      // Add a session to the singleton store
      const store = getFlyoutManagerStore();
      store.addFlyout('test-flyout', 'Test Title', 'main', 'm');

      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="hook-test">{isManaged ? 'True' : 'False'}</div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);

      expect(getByTestSubject('hook-test')).toHaveTextContent('True');
    });

    it('reactively updates when store changes', () => {
      const store = getFlyoutManagerStore();

      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="hook-test">{isManaged ? 'True' : 'False'}</div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);

      // Initially false
      expect(getByTestSubject('hook-test')).toHaveTextContent('False');

      // Add a flyout - should become true
      act(() => {
        store.addFlyout('test-flyout', 'Test Title', 'main', 'm');
      });
      expect(getByTestSubject('hook-test')).toHaveTextContent('True');

      // Close the flyout - should become false again
      act(() => {
        store.closeFlyout('test-flyout');
      });
      expect(getByTestSubject('hook-test')).toHaveTextContent('False');
    });
  });
});
