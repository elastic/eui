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
import * as hooks from './hooks';
import * as selectors from './selectors';

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

// Mock hooks that would otherwise depend on ResizeObserver or animation timing
const mockCloseFlyout = jest.fn();

jest.mock('./hooks', () => ({
  useFlyoutManagerReducer: () => ({
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    dispatch: jest.fn(),
    addFlyout: jest.fn(),
    closeFlyout: mockCloseFlyout,
    setActiveFlyout: jest.fn(),
    setFlyoutWidth: jest.fn(),
    goBack: jest.fn(),
    goToFlyout: jest.fn(),
    getHistoryItems: jest.fn(() => []),
  }),
  useFlyoutManager: () => ({
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    addFlyout: jest.fn(),
    closeFlyout: mockCloseFlyout,
    setFlyoutWidth: jest.fn(),
    goBack: jest.fn(),
    goToFlyout: jest.fn(),
    getHistoryItems: jest.fn(() => []),
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
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    addFlyout: jest.fn(),
    closeFlyout: mockCloseFlyout,
    setFlyoutWidth: jest.fn(),
    goBack: jest.fn(),
    goToFlyout: jest.fn(),
    getHistoryItems: jest.fn(() => []),
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

  describe('onClose callback behavior', () => {
    it('calls onClose callback during component cleanup/unmount', () => {
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

      // onClose should be called during cleanup
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(expect.any(MouseEvent));
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

  describe('force unmount mechanism', () => {
    it('triggers onClose when flyout is removed from state but component still exists', () => {
      const onClose = jest.fn();

      // Mock that starts with flyout in state, then removes it
      let flyoutInState = true;
      let isActive = true;

      const useFlyoutManagerSpy = jest.spyOn(hooks, 'useFlyoutManager');
      const useIsFlyoutActiveSpy = jest.spyOn(selectors, 'useIsFlyoutActive');

      useFlyoutManagerSpy.mockImplementation(() => ({
        state: {
          sessions: [],
          flyouts: flyoutInState
            ? [{ flyoutId: 'force-unmount-test', level: LEVEL_MAIN as any }]
            : [],
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: mockCloseFlyout,
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        getHistoryItems: jest.fn(() => []),
      }));

      useIsFlyoutActiveSpy.mockImplementation(() => isActive);

      const { rerender } = renderInProvider(
        <EuiManagedFlyout
          id="force-unmount-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'Test Flyout' }}
        />
      );

      // Initially onClose should not be called
      expect(onClose).not.toHaveBeenCalled();

      // Simulate flyout being removed from state (e.g., back button clicked)
      act(() => {
        flyoutInState = false;
        isActive = false;
        rerender(
          <EuiManagedFlyout
            id="force-unmount-test"
            level={LEVEL_MAIN}
            onClose={onClose}
            flyoutMenuProps={{ title: 'Test Flyout' }}
          />
        );
      });

      // Force unmount should trigger onClose
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(expect.any(MouseEvent));

      // Restore mocks
      useFlyoutManagerSpy.mockRestore();
      useIsFlyoutActiveSpy.mockRestore();
    });

    it('does not trigger force unmount for new flyouts not yet in state', () => {
      const onClose = jest.fn();

      const useFlyoutManagerSpy = jest.spyOn(hooks, 'useFlyoutManager');
      const useIsFlyoutActiveSpy = jest.spyOn(selectors, 'useIsFlyoutActive');

      useFlyoutManagerSpy.mockReturnValue({
        state: {
          sessions: [],
          flyouts: [], // Empty - flyout never added to state
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: mockCloseFlyout,
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        getHistoryItems: jest.fn(() => []),
      });

      useIsFlyoutActiveSpy.mockReturnValue(false);

      renderInProvider(
        <EuiManagedFlyout
          id="new-flyout-test"
          level={LEVEL_MAIN}
          onClose={onClose}
          flyoutMenuProps={{ title: 'New Flyout' }}
        />
      );

      // onClose should NOT be called for new flyouts that were never in state
      expect(onClose).not.toHaveBeenCalled();

      // Restore mocks
      useFlyoutManagerSpy.mockRestore();
      useIsFlyoutActiveSpy.mockRestore();
    });
  });

  describe('back button scenario simulation', () => {
    it('handles the back button workflow correctly', () => {
      const onCloseB = jest.fn();

      // Collection of test fixtures for state verification: A first, then A + B, then just A
      const sessionStates = [
        // Initial: Session A only
        {
          sessions: [{ main: 'session-a', child: null, title: 'Session A' }],
          flyouts: [{ flyoutId: 'session-a', level: LEVEL_MAIN as any }],
        },
        // Session B added
        {
          sessions: [
            { main: 'session-a', child: null, title: 'Session A' },
            { main: 'session-b', child: null, title: 'Session B' },
          ],
          flyouts: [
            { flyoutId: 'session-a', level: LEVEL_MAIN as any },
            { flyoutId: 'session-b', level: LEVEL_MAIN as any },
          ],
        },
        // Back button: Session B removed
        {
          sessions: [{ main: 'session-a', child: null, title: 'Session A' }],
          flyouts: [{ flyoutId: 'session-a', level: LEVEL_MAIN as any }],
        },
      ];

      let stateIndex = 1; // Start with both sessions
      const useFlyoutManagerSpy = jest.spyOn(hooks, 'useFlyoutManager');

      useFlyoutManagerSpy.mockImplementation(() => ({
        state: {
          ...sessionStates[stateIndex],
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: mockCloseFlyout,
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        getHistoryItems: jest.fn(() => []),
      }));

      // Render Session B
      const { rerender } = renderInProvider(
        <EuiManagedFlyout
          id="session-b"
          level={LEVEL_MAIN}
          onClose={onCloseB}
          flyoutMenuProps={{ title: 'Session B' }}
        />
      );

      expect(onCloseB).not.toHaveBeenCalled();

      // Simulate back button: remove Session B from state
      act(() => {
        stateIndex = 2; // State with only Session A
        rerender(
          <EuiManagedFlyout
            id="session-b"
            level={LEVEL_MAIN}
            onClose={onCloseB}
            flyoutMenuProps={{ title: 'Session B' }}
          />
        );
      });

      // Session B's onClose should be called via force unmount
      expect(onCloseB).toHaveBeenCalledTimes(1);

      // Restore mock
      useFlyoutManagerSpy.mockRestore();
    });
  });
});
