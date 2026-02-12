/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom');
  const mockFlushSync = jest.fn((callback: () => void) => callback());
  return {
    ...actual,
    flushSync: mockFlushSync,
  };
});

import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactDOM from 'react-dom';

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

const mockFlushSync: jest.Mock = jest.mocked(ReactDOM.flushSync);

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
const mockCloseAllFlyouts = jest.fn();

// Create mock state and functions once at module scope to avoid redundant object creation
const mockState = {
  sessions: [],
  flyouts: [],
  layoutMode: 'side-by-side' as const,
};

const mockFunctions = {
  dispatch: jest.fn(),
  addFlyout: jest.fn(),
  closeFlyout: mockCloseFlyout,
  closeAllFlyouts: mockCloseAllFlyouts,
  setActiveFlyout: jest.fn(),
  setFlyoutWidth: jest.fn(),
  goBack: jest.fn(),
  goToFlyout: jest.fn(),
  historyItems: [],
};

const mockFlyoutManager = {
  state: mockState,
  ...mockFunctions,
};

// Mock hooks that would otherwise depend on ResizeObserver or animation timing
jest.mock('./hooks', () => ({
  useFlyoutManager: () => mockFlyoutManager,
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
  useFlyoutManager: () => mockFlyoutManager,
}));

// Mock resize observer hook to return a fixed width
jest.mock('../../observer/resize_observer', () => ({
  useResizeObserver: () => ({ width: 480 }),
}));

// Cache the actual validation module for tests that need to temporarily restore it
const actualValidation = jest.requireActual('./validation');

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

  it('calls closeAllFlyouts during cleanup when main flyout unmounts', () => {
    const onClose = jest.fn();

    const { getByTestSubject, unmount } = renderInProvider(
      <EuiManagedFlyout id="close-me" level={LEVEL_MAIN} onClose={onClose} />
    );

    act(() => {
      userEvent.click(getByTestSubject('managed-flyout'));
    });

    // The onClose should be called when the flyout is clicked
    expect(onClose).toHaveBeenCalled();

    // The closeAllFlyouts should be called when the component unmounts (cleanup)
    act(() => {
      unmount();
    });

    expect(mockCloseAllFlyouts).toHaveBeenCalled();
    expect(mockCloseFlyout).not.toHaveBeenCalled();
  });

  it('calls closeFlyout during cleanup when child flyout unmounts', () => {
    const onClose = jest.fn();

    const { getByTestSubject, unmount } = renderInProvider(
      <EuiManagedFlyout id="close-me" level={LEVEL_CHILD} onClose={onClose} />
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
    expect(mockCloseAllFlyouts).not.toHaveBeenCalled();
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
      // Temporarily restore the real validation function for this test
      const originalMock = require('./validation').validateManagedFlyoutSize;
      require('./validation').validateManagedFlyoutSize =
        actualValidation.validateManagedFlyoutSize;

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
      // Temporarily restore the real validation function for this test
      const originalMock = require('./validation').validateManagedFlyoutSize;
      require('./validation').validateManagedFlyoutSize =
        actualValidation.validateManagedFlyoutSize;

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

      // Clear any calls from mount
      mockCloseAllFlyouts.mockClear();

      // Unmount the component to trigger cleanup
      act(() => {
        unmount();
      });

      // onClose should NOT be called during cleanup (intentional design)
      expect(onClose).not.toHaveBeenCalled();
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

  describe('manager state update ordering', () => {
    it('calls closeAllFlyouts before parent onClose callback', () => {
      const onClose = jest.fn();
      const callOrder: string[] = [];

      // Track call order
      mockCloseAllFlyouts.mockImplementation(() => {
        callOrder.push('closeAllFlyouts');
      });
      onClose.mockImplementation(() => {
        callOrder.push('onClose');
      });

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="ordering-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Trigger close via user interaction (simulates X button)
      act(() => {
        userEvent.click(getByTestSubject('managed-flyout'));
      });

      // Verify closeAllFlyouts was called BEFORE onClose
      expect(callOrder).toEqual(['closeAllFlyouts', 'onClose']);
      expect(mockCloseAllFlyouts).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    it('prevents duplicate closeAllFlyouts calls when closing via user interaction', () => {
      const onClose = jest.fn();

      const { getByTestSubject, unmount } = renderInProvider(
        <EuiManagedFlyout
          id="duplicate-prevention-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Clear any setup calls
      mockCloseAllFlyouts.mockClear();

      // User closes the flyout
      act(() => {
        userEvent.click(getByTestSubject('managed-flyout'));
      });

      // closeAllFlyouts should be called once from the onClose handler
      expect(mockCloseAllFlyouts).toHaveBeenCalledTimes(1);

      // Manual, duplicate cleanup call
      act(() => {
        unmount();
      });

      // Should still be called only once total
      expect(mockCloseAllFlyouts).toHaveBeenCalledTimes(1);
    });

    it('handles cascade close correctly when main flyout closes', () => {
      const onCloseMain = jest.fn();
      const onCloseChild = jest.fn();

      // Simulate a main flyout with child
      const { container } = renderInProvider(
        <>
          <EuiManagedFlyout
            id="main-flyout"
            level={LEVEL_MAIN}
            onClose={onCloseMain}
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout-element"
          />
          <EuiManagedFlyout
            id="child-flyout"
            level={LEVEL_CHILD}
            onClose={onCloseChild}
            data-test-subj="child-flyout-element"
          />
        </>
      );

      // Find the main flyout specifically
      const mainFlyout = container.querySelector('[id="main-flyout"]');
      expect(mainFlyout).toBeInTheDocument();

      // Close the main flyout
      act(() => {
        if (mainFlyout) {
          userEvent.click(mainFlyout);
        }
      });

      // Manager should be notified to handle cascade close
      expect(mockCloseAllFlyouts).toHaveBeenCalled();
      expect(onCloseMain).toHaveBeenCalled();
    });

    it('calls closeFlyout when closing a child flyout', () => {
      const onCloseMain = jest.fn();
      const onCloseChild = jest.fn();

      // Simulate a main flyout with child
      const { container } = renderInProvider(
        <>
          <EuiManagedFlyout
            id="main-flyout"
            level={LEVEL_MAIN}
            onClose={onCloseMain}
            flyoutMenuProps={{ title: 'Main Flyout' }}
            data-test-subj="main-flyout-element"
          />
          <EuiManagedFlyout
            id="child-flyout"
            level={LEVEL_CHILD}
            onClose={onCloseChild}
            data-test-subj="child-flyout-element"
          />
        </>
      );

      // Find the child flyout specifically
      const childFlyout = container.querySelector('[id="child-flyout"]');
      expect(childFlyout).toBeInTheDocument();

      // Close the child flyout
      act(() => {
        if (childFlyout) {
          userEvent.click(childFlyout);
        }
      });

      // Child flyouts should call closeFlyout, not closeAllFlyouts
      expect(mockCloseFlyout).toHaveBeenCalledWith('child-flyout');
      expect(mockCloseFlyout).toHaveBeenCalledTimes(1);
      expect(mockCloseAllFlyouts).not.toHaveBeenCalled();
      expect(onCloseChild).toHaveBeenCalled();
    });

    it('uses flushSync to ensure synchronous state update before DOM cleanup', () => {
      const onClose = jest.fn();

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="flush-sync-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Clear any setup calls
      mockFlushSync.mockClear();
      mockCloseAllFlyouts.mockClear();

      // Trigger close via user interaction
      act(() => {
        userEvent.click(getByTestSubject('managed-flyout'));
      });

      // Verify flushSync was called
      expect(mockFlushSync).toHaveBeenCalledTimes(1);
      expect(mockFlushSync).toHaveBeenCalledWith(expect.any(Function));

      // Verify closeAllFlyouts was called (inside flushSync)
      expect(mockCloseAllFlyouts).toHaveBeenCalled();

      // Verify onClose was called after the synchronous state update
      expect(onClose).toHaveBeenCalled();
    });

    it('calls closeAllFlyouts inside flushSync callback', () => {
      const onClose = jest.fn();
      const callOrder: string[] = [];

      // Track execution order
      mockFlushSync.mockImplementation((callback: () => void) => {
        callOrder.push('flushSync-start');
        callback();
        callOrder.push('flushSync-end');
      });

      mockCloseAllFlyouts.mockImplementation(() => {
        callOrder.push('closeAllFlyouts');
      });

      onClose.mockImplementation(() => {
        callOrder.push('onClose');
      });

      const { getByTestSubject } = renderInProvider(
        <EuiManagedFlyout
          id="flush-sync-order-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Clear setup
      callOrder.length = 0;

      // Trigger close
      act(() => {
        userEvent.click(getByTestSubject('managed-flyout'));
      });

      // Verify closeAllFlyouts is called INSIDE flushSync, and onClose is called AFTER
      expect(callOrder).toEqual([
        'flushSync-start',
        'closeAllFlyouts',
        'flushSync-end',
        'onClose',
      ]);
    });
  });
});
