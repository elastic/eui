/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { EuiFlyoutIsManagedProvider, useIsInManagedFlyout } from './context';

describe('EuiFlyoutIsManagedProvider', () => {
  it('renders', () => {
    const { container } = render(
      <EuiFlyoutIsManagedProvider isManaged={true} {...requiredProps}>
        <div />
      </EuiFlyoutIsManagedProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('context value', () => {
    it('provides true when isManaged is true', () => {
      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="context-value">
            {isManaged ? 'Managed' : 'Not Managed'}
          </div>
        );
      };

      const { getByTestSubject } = render(
        <EuiFlyoutIsManagedProvider isManaged={true}>
          <TestComponent />
        </EuiFlyoutIsManagedProvider>
      );

      expect(getByTestSubject('context-value')).toHaveTextContent('Managed');
    });

    it('provides false when isManaged is false', () => {
      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="context-value">
            {isManaged ? 'Managed' : 'Not Managed'}
          </div>
        );
      };

      const { getByTestSubject } = render(
        <EuiFlyoutIsManagedProvider isManaged={false}>
          <TestComponent />
        </EuiFlyoutIsManagedProvider>
      );

      expect(getByTestSubject('context-value')).toHaveTextContent(
        'Not Managed'
      );
    });
  });

  describe('useIsInManagedFlyout hook', () => {
    it('returns false when used outside of provider', () => {
      const TestComponent = () => {
        const isManaged = useIsInManagedFlyout();
        return (
          <div data-test-subj="hook-test">{isManaged ? 'True' : 'False'}</div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);

      expect(getByTestSubject('hook-test')).toHaveTextContent('False');
    });
  });
});
