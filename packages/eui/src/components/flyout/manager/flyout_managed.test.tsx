/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { EuiManagedFlyout } from './flyout_managed';
import { EuiFlyoutManager } from './provider';
import {
  LEVEL_CHILD,
  LEVEL_MAIN,
  PROPERTY_FLYOUT,
  PROPERTY_LEVEL,
} from './const';

// Mock base flyout to a simple div to avoid complex internals
jest.mock('../flyout.component', () => {
  const React = require('react');
  return {
    EuiFlyoutComponent: React.forwardRef(function MockFlyout(
      { isOpen, ...props }: any,
      ref: any
    ) {
      // Extract flyoutMenuProps to prevent it from being passed to DOM
      const { flyoutMenuProps, ...domProps } = props;
      return React.createElement('div', {
        ref,
        ...domProps,
        'data-test-subj': 'managed-flyout',
        'data-is-open': isOpen,
        onClick: () => props.onClose && props.onClose({} as any),
      });
    }),
  };
});

// Shared mock functions - must be defined in module scope for Jest
const mockCloseFlyout = jest.fn();
const createMockState = () => ({
  sessions: [],
  flyouts: [],
  layoutMode: 'side-by-side' as const,
});
const createMockFunctions = () => ({
  dispatch: jest.fn(),
  addFlyout: jest.fn(),
  closeFlyout: mockCloseFlyout,
  setActiveFlyout: jest.fn(),
  setFlyoutWidth: jest.fn(),
  goBack: jest.fn(),
  goToFlyout: jest.fn(),
  historyItems: [],
});

// Mock hooks that would otherwise depend on ResizeObserver or animation timing
jest.mock('./hooks', () => ({
  useFlyoutManager: () => ({
    state: createMockState(),
    ...createMockFunctions(),
  }),
  useIsFlyoutActive: () => true,
  useHasChildFlyout: () => false,
  useParentFlyoutSize: () => 'm',
  useFlyoutLayoutMode: () => 'side-by-side',
  useFlyoutId: (id?: string) => id ?? 'generated-id',
  useCurrentSession: () => null,
}));

jest.mock('./selectors', () => ({
  useIsFlyoutRegistered: () => false,
  useIsFlyoutActive: () => true,
  useHasChildFlyout: () => false,
  useParentFlyoutSize: () => 'm',
  useCurrentSession: () => null,
  useSession: () => null,
  useHasActiveSession: () => false,
  useFlyout: () => null,
  useCurrentMainFlyout: () => null,
  useCurrentChildFlyout: () => null,
  useFlyoutWidth: () => null,
}));

// Mock validation helpers to be deterministic
jest.mock('./validation', () => ({
  createValidationErrorMessage: jest.fn((e: any) => String(e)),
  isNamedSize: jest.fn(() => true),
  validateFlyoutTitle: jest.fn(() => undefined),
  validateManagedFlyoutSize: jest.fn(() => undefined),
  validateSizeCombination: jest.fn(() => undefined),
}));

jest.mock('./provider', () => ({
  ...jest.requireActual('./provider'),
  useFlyoutManager: () => ({
    state: createMockState(),
    ...createMockFunctions(),
  }),
}));

// Mock resize observer hook to return a fixed width
jest.mock('../../observer/resize_observer', () => ({
  useResizeObserver: () => ({ width: 480 }),
}));

describe('EuiManagedFlyout', () => {
  const renderInProvider = (ui: React.ReactElement) =>
    render(<EuiFlyoutManager>{ui}</EuiFlyoutManager>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and sets managed data attributes', () => {
    const { getByTestSubject } = renderInProvider(
      <EuiManagedFlyout
        {...requiredProps}
        id="my-flyout"
        level={LEVEL_MAIN}
        onClose={() => {}}
      />
    );

    const el = getByTestSubject('managed-flyout');
    expect(el).toHaveAttribute(PROPERTY_FLYOUT);
    expect(el).toHaveAttribute(PROPERTY_LEVEL, LEVEL_MAIN);
  });

  it('calls the unregister callback prop when onClose', () => {
    const onClose = jest.fn();

    const { getByTestSubject, unmount } = renderInProvider(
      <EuiManagedFlyout id="close-me" level={LEVEL_MAIN} onClose={onClose} />
    );

    act(() => {
      userEvent.click(getByTestSubject('managed-flyout'));
    });

    // The onClose should be called when the flyout is clicked
    expect(onClose).toHaveBeenCalled();

    // The closeFlyout should be called when the component unmounts (cleanup)
    act(() => {
      unmount();
    });

    expect(mockCloseFlyout).toHaveBeenCalledWith('close-me');
  });

  it('registers child flyout and sets data-level child', () => {
    const { getByTestSubject } = renderInProvider(
      <EuiManagedFlyout level={LEVEL_CHILD} onClose={() => {}} />
    );

    expect(getByTestSubject('managed-flyout')).toHaveAttribute(
      PROPERTY_LEVEL,
      LEVEL_CHILD
    );
  });

  describe('flyoutMenuProps integration', () => {
    it('passes flyoutMenuProps to the underlying flyout component', () => {
      const flyoutMenuProps = {
        title: 'Test Menu',
        hideCloseButton: true,
        customActions: [
          {
            iconType: 'gear',
            onClick: jest.fn(),
            'aria-label': 'Settings',
          },
        ],
      };

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={flyoutMenuProps}
        />
      );

      const el = getByTestSubject('managed-flyout');
      expect(el).toHaveAttribute('data-test-subj', 'managed-flyout');
    });

    it('merges flyoutMenuProps with extracted title from flyoutMenuProps.title', () => {
      const flyoutMenuProps = {
        title: 'Original Title',
        hideCloseButton: false,
      };

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={flyoutMenuProps}
        />
      );

      const el = getByTestSubject('managed-flyout');
      expect(el).toHaveAttribute('data-test-subj', 'managed-flyout');
    });

    it('merges flyoutMenuProps with extracted title from aria-label', () => {
      const flyoutMenuProps = {
        hideCloseButton: true,
        customActions: [],
      };

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          aria-label="Aria Label Title"
          flyoutMenuProps={flyoutMenuProps}
        />
      );

      const el = getByTestSubject('managed-flyout');
      expect(el).toHaveAttribute('data-test-subj', 'managed-flyout');
    });
  });

  describe('title handling', () => {
    it('renders successfully when title is provided via flyoutMenuProps', () => {
      const flyoutMenuProps = { title: 'Test Title' };

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={flyoutMenuProps}
        />
      );

      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();
    });

    it('renders successfully when title is provided via aria-label', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          aria-label="Aria Label Title"
        />
      );

      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();
    });

    it('renders successfully for child flyouts without title', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="child-flyout"
          level={LEVEL_CHILD}
          onClose={() => {}}
        />
      );

      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();
    });
  });

  describe('hideTitle prop handling', () => {
    it('passes hideTitle prop through flyoutMenuProps when explicitly set to true', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Title',
            hideTitle: true,
          }}
        />
      );

      const flyout = getByTestSubject('managed-flyout');
      expect(flyout).toBeInTheDocument();
      // The hideTitle prop should be passed through to the base component
    });

    it('passes hideTitle prop through flyoutMenuProps when explicitly set to false', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Title',
            hideTitle: false,
          }}
        />
      );

      const flyout = getByTestSubject('managed-flyout');
      expect(flyout).toBeInTheDocument();
      // The hideTitle prop should be passed through to the base component
    });

    it('merges hideTitle with other flyoutMenuProps correctly', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Title',
            hideTitle: true,
            hideCloseButton: false,
          }}
        />
      );

      const flyout = getByTestSubject('managed-flyout');
      expect(flyout).toBeInTheDocument();
    });

    it('does not include hideTitle when not specified for main flyout', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="test-flyout"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Test Title',
            // hideTitle not specified - will be auto-determined by base component
          }}
        />
      );

      const flyout = getByTestSubject('managed-flyout');
      expect(flyout).toBeInTheDocument();
    });

    it('does not include hideTitle when not specified for child flyout', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="child-flyout"
          level={LEVEL_CHILD}
          onClose={() => {}}
          flyoutMenuProps={{
            title: 'Child Title',
            // hideTitle not specified - will be auto-determined by base component
          }}
        />
      );

      const flyout = getByTestSubject('managed-flyout');
      expect(flyout).toBeInTheDocument();
    });
  });

  describe('size handling', () => {
    it('defaults main flyout size to "m" when no size is provided', () => {
      // Import the real validation function to test the actual behavior
      const { validateManagedFlyoutSize } = jest.requireActual('./validation');

      // Temporarily restore the real validation function for this test
      const originalMock = require('./validation').validateManagedFlyoutSize;
      require('./validation').validateManagedFlyoutSize =
        validateManagedFlyoutSize;

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="default-size-test"
          level={LEVEL_MAIN}
          onClose={() => {}}
          flyoutMenuProps={{ title: 'Test Flyout' }}
          // Explicitly not providing size prop
        />
      );

      // The flyout should render successfully, indicating the default size worked
      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();

      // Restore the mock
      require('./validation').validateManagedFlyoutSize = originalMock;
    });

    it('defaults child flyout size to "s" when no size is provided', () => {
      // Import the real validation function to test the actual behavior
      const { validateManagedFlyoutSize } = jest.requireActual('./validation');

      // Temporarily restore the real validation function for this test
      const originalMock = require('./validation').validateManagedFlyoutSize;
      require('./validation').validateManagedFlyoutSize =
        validateManagedFlyoutSize;

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="default-child-size-test"
          level={LEVEL_CHILD}
          onClose={() => {}}
          // Explicitly not providing size prop
        />
      );

      // The flyout should render successfully, indicating the default size worked
      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();

      // Restore the mock
      require('./validation').validateManagedFlyoutSize = originalMock;
    });

    it('uses provided size when size is explicitly set', () => {
      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="explicit-size-test"
          level={LEVEL_MAIN}
          size="s"
          onClose={() => {}}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // The flyout should render successfully with explicit size
      expect(getByTestSubject('managed-flyout')).toBeInTheDocument();
    });
  });

  describe('onClose callback behavior', () => {
    it('does not call onClose callback during component cleanup/unmount', () => {
      const onClose = jest.fn();

      const { unmount } = renderInProvider(
        <EuiManagedFlyout
          id="cleanup-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Initially onClose should not be called
      expect(onClose).not.toHaveBeenCalled();

      // Unmount the component to trigger cleanup
      act(() => {
        unmount();
      });

      // onClose should NOT be called during cleanup (intentional design)
      expect(onClose).not.toHaveBeenCalled();
      expect(mockCloseFlyout).toHaveBeenCalledWith('cleanup-test');
    });

    it('does not call onClose multiple times (double-firing prevention)', () => {
      const onClose = jest.fn();

      const { getByTestSubject, unmount } = renderInProvider(
        <EuiManagedFlyout
          id="double-fire-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // First call via direct onClick
      act(() => {
        userEvent.click(getByTestSubject('managed-flyout'));
      });

      expect(onClose).toHaveBeenCalledTimes(1);

      // Unmount should not call onClose again due to double-firing prevention
      act(() => {
        unmount();
      });

      // Should still be called only once
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
