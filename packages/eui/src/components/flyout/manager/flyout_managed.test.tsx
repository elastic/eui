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
      props: any,
      ref: any
    ) {
      // Extract flyoutMenuProps to prevent it from being passed to DOM
      const { flyoutMenuProps, ...domProps } = props;
      return React.createElement('div', {
        ref,
        ...domProps,
        'data-test-subj': 'managed-flyout',
        onClick: () => props.onClose && props.onClose({} as any),
      });
    }),
  };
});

// Mock hooks that would otherwise depend on ResizeObserver or animation timing
const mockCloseFlyout = jest.fn();
const mockCallUnregisterCallback = jest.fn();

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
}));

// Mock validation helpers to be deterministic
jest.mock('./validation', () => ({
  validateManagedFlyoutSize: () => undefined,
  validateSizeCombination: () => undefined,
  validateFlyoutTitle: () => undefined,
  createValidationErrorMessage: (e: any) => String(e),
  isNamedSize: () => true,
}));

// Mock unregister callback functions
jest.mock('./provider', () => ({
  ...jest.requireActual('./provider'),
  registerUnregisterCallback: jest.fn(),
  unregisterUnregisterCallback: jest.fn(),
  callUnregisterCallback: mockCallUnregisterCallback,
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

    // Set up the mock to call the unregister callback when closeFlyout is called
    mockCloseFlyout.mockImplementation((flyoutId) => {
      mockCallUnregisterCallback(flyoutId);
    });

    const { getByTestSubject } = renderInProvider(
      <EuiManagedFlyout id="close-me" level={LEVEL_MAIN} onClose={onClose} />
    );

    act(() => {
      userEvent.click(getByTestSubject('managed-flyout'));
    });

    // The onClose should be called through the unregister callback mechanism
    expect(mockCloseFlyout).toHaveBeenCalledWith('close-me');
    expect(mockCallUnregisterCallback).toHaveBeenCalledWith('close-me');
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
});
