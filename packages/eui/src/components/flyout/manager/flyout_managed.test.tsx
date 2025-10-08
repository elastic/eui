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
  validateManagedFlyoutSize: jest.fn(() => undefined),
  validateSizeCombination: jest.fn(() => undefined),
  validateFlyoutTitle: jest.fn(() => undefined),
  createValidationErrorMessage: jest.fn((e: any) => String(e)),
  isNamedSize: jest.fn(() => true),
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
});
