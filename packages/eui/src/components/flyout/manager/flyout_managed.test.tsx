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
      return React.createElement('div', {
        ref,
        ...props,
        'data-test-subj': 'managed-flyout',
        onClick: () => props.onClose && props.onClose({} as any),
      });
    }),
  };
});

// Mock hooks that would otherwise depend on ResizeObserver or animation timing
jest.mock('./hooks', () => ({
  useFlyoutManagerReducer: () => ({
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    dispatch: jest.fn(),
    addFlyout: jest.fn(),
    closeFlyout: jest.fn(),
    setActiveFlyout: jest.fn(),
    setFlyoutWidth: jest.fn(),
  }),
  useFlyoutManager: () => ({
    state: { sessions: [], flyouts: [], layoutMode: 'side-by-side' },
    addFlyout: jest.fn(),
    closeFlyout: jest.fn(),
    setFlyoutWidth: jest.fn(),
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
  createValidationErrorMessage: (e: any) => String(e),
  isNamedSize: () => true,
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

  it('calls onClose prop when onClose is invoked', () => {
    const onClose = jest.fn();

    const { getByTestSubject } = renderInProvider(
      <EuiManagedFlyout id="close-me" level={LEVEL_MAIN} onClose={onClose} />
    );

    act(() => {
      userEvent.click(getByTestSubject('managed-flyout'));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
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
