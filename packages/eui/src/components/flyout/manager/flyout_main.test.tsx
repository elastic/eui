/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';

import { EuiFlyoutMain } from './flyout_main';
import { EuiFlyoutManager } from './provider';
import { LEVEL_MAIN, PROPERTY_LEVEL } from './const';

// Mock managed flyout so we can observe props passed through
jest.mock('./flyout_managed', () => ({
  EuiManagedFlyout: ({ children, pushMinBreakpoint, level, ...props }: any) => (
    <div
      data-test-subj="main-flyout"
      data-managed-flyout
      data-managed-flyout-level={level}
      {...props}
    >
      {children}
    </div>
  ),
}));

// Keep layout/ID hooks deterministic
jest.mock('./hooks', () => ({
  useFlyoutManager: () => ({
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    dispatch: jest.fn(),
    addFlyout: jest.fn(),
    closeFlyout: jest.fn(),
    setActiveFlyout: jest.fn(),
    setFlyoutWidth: jest.fn(),
    goBack: jest.fn(),
    goToFlyout: jest.fn(),
    historyItems: [],
  }),
  useHasChildFlyout: () => false,
  useFlyoutId: (id?: string) => id ?? 'generated-id',
}));

describe('EuiFlyoutMain', () => {
  const renderInProvider = (ui: React.ReactElement) =>
    render(<EuiFlyoutManager>{ui}</EuiFlyoutManager>);

  // intentionally skipping shouldRenderCustomStyles for this wrapper

  it('renders and passes level=main to managed flyout', () => {
    const { getByTestSubject } = renderInProvider(
      <EuiFlyoutMain onClose={() => {}} />
    );
    expect(getByTestSubject('main-flyout')).toHaveAttribute(
      PROPERTY_LEVEL,
      LEVEL_MAIN
    );
  });

  // CSS pass-through covered elsewhere; avoid hook re-mocking complexity here
});
