/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { EuiFlyoutSessionProvider } from './flyout_provider';
import {
  useEuiFlyoutSession,
  EuiFlyoutSessionOpenMainOptions,
  EuiFlyoutSessionOpenChildOptions,
  EuiFlyoutSessionOpenGroupOptions,
} from './use_eui_flyout';

// Mock the flyout components for testing
jest.mock('../flyout', () => ({
  EuiFlyout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="euiFlyout">{children}</div>
  ),
  EuiFlyoutSize: { s: 's', m: 'm', l: 'l' },
}));

jest.mock('../flyout_child', () => ({
  EuiFlyoutChild: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="euiFlyoutChild">{children}</div>
  ),
}));

// Create a test component to exercise the hook
interface TestComponentProps {
  onOpenFlyout?: () => void;
  onOpenChildFlyout?: () => void;
  onOpenFlyoutGroup?: () => void;
  onGoBack?: () => void;
  onClearHistory?: () => void;
}

const TestComponent: React.FC<TestComponentProps> = ({
  onOpenFlyout,
  onOpenChildFlyout,
  onOpenFlyoutGroup,
  onGoBack,
  onClearHistory,
}) => {
  const {
    openFlyout,
    openChildFlyout,
    openFlyoutGroup,
    closeChildFlyout,
    goBack,
    isFlyoutOpen,
    isChildFlyoutOpen,
    canGoBack,
    clearHistory,
  } = useEuiFlyoutSession();

  return (
    <div>
      <button
        data-testid="openFlyoutButton"
        onClick={() => {
          const options: EuiFlyoutSessionOpenMainOptions = {
            size: 'm',
            meta: { type: 'test' },
          };
          openFlyout(options);
          if (onOpenFlyout) onOpenFlyout();
        }}
      >
        Open Flyout
      </button>

      <button
        data-testid="openChildFlyoutButton"
        onClick={() => {
          const options: EuiFlyoutSessionOpenChildOptions = {
            size: 's',
            meta: { type: 'testChild' },
          };
          openChildFlyout(options);
          if (onOpenChildFlyout) onOpenChildFlyout();
        }}
        disabled={!isFlyoutOpen}
      >
        Open Child Flyout
      </button>

      <button
        data-testid="openFlyoutGroupButton"
        onClick={() => {
          const options: EuiFlyoutSessionOpenGroupOptions = {
            main: {
              size: 'm',
              flyoutProps: { className: 'main-flyout' },
              onUnmount: () => {},
            },
            child: {
              size: 's',
              flyoutProps: { className: 'child-flyout' },
              onUnmount: () => {},
            },
            meta: { type: 'testGroup' },
          };
          openFlyoutGroup(options);
          if (onOpenFlyoutGroup) onOpenFlyoutGroup();
        }}
      >
        Open Flyout Group
      </button>

      <button
        data-testid="closeChildFlyoutButton"
        onClick={() => {
          closeChildFlyout();
        }}
        disabled={!isChildFlyoutOpen}
      >
        Close Child Flyout
      </button>

      <button
        data-testid="goBackButton"
        onClick={() => {
          goBack();
          if (onGoBack) onGoBack();
        }}
        disabled={!canGoBack}
      >
        Go Back
      </button>

      <button
        data-testid="clearHistoryButton"
        onClick={() => {
          clearHistory();
          if (onClearHistory) onClearHistory();
        }}
      >
        Clear History
      </button>

      <div data-testid="flyoutStatus">
        {isFlyoutOpen ? 'Flyout is open' : 'Flyout is closed'}
      </div>

      <div data-testid="childFlyoutStatus">
        {isChildFlyoutOpen ? 'Child flyout is open' : 'Child flyout is closed'}
      </div>

      <div data-testid="canGoBackStatus">
        {canGoBack ? 'Can go back' : 'Cannot go back'}
      </div>
    </div>
  );
};

// Create a wrapper component that provides the context
const TestWrapper: React.FC<
  React.PropsWithChildren & { children?: React.ReactNode }
> = ({ children }) => {
  const renderMainFlyoutContent = (context: any) => (
    <div data-testid="mainFlyoutContent">
      Main flyout content: {JSON.stringify(context.meta)}
    </div>
  );

  const renderChildFlyoutContent = (context: any) => (
    <div data-testid="childFlyoutContent">
      Child flyout content: {JSON.stringify(context.meta)}
    </div>
  );

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      {children}
    </EuiFlyoutSessionProvider>
  );
};

describe('useEuiFlyoutSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('openFlyout dispatches the correct action', () => {
    const onOpenFlyout = jest.fn();
    render(
      <TestWrapper>
        <TestComponent onOpenFlyout={onOpenFlyout} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('openFlyoutButton'));

    expect(onOpenFlyout).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is closed'
    );
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Cannot go back'
    );
  });

  test('openChildFlyout dispatches the correct action when main flyout is open', () => {
    const onOpenChildFlyout = jest.fn();
    render(
      <TestWrapper>
        <TestComponent onOpenChildFlyout={onOpenChildFlyout} />
      </TestWrapper>
    );

    // First open the main flyout
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    // Then open the child flyout
    fireEvent.click(screen.getByTestId('openChildFlyoutButton'));

    expect(onOpenChildFlyout).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is open'
    );
  });

  test('openFlyoutGroup opens both main and child flyouts in a single action', () => {
    const onOpenFlyoutGroup = jest.fn();
    render(
      <TestWrapper>
        <TestComponent onOpenFlyoutGroup={onOpenFlyoutGroup} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('openFlyoutGroupButton'));

    expect(onOpenFlyoutGroup).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is open'
    );
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Cannot go back'
    );
  });

  test('closeChildFlyout closes only the child flyout', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // Open both flyouts
    fireEvent.click(screen.getByTestId('openFlyoutGroupButton'));

    // Then close the child flyout
    fireEvent.click(screen.getByTestId('closeChildFlyoutButton'));

    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is closed'
    );
  });

  test('goBack navigates through the history stack', () => {
    const onGoBack = jest.fn();
    render(
      <TestWrapper>
        <TestComponent onGoBack={onGoBack} />
      </TestWrapper>
    );

    // First open one flyout
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );

    // Then open another flyout to create history
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Can go back'
    );

    // Go back, should restore previous flyout (not tested here) or close if no history
    fireEvent.click(screen.getByTestId('goBackButton'));

    expect(onGoBack).toHaveBeenCalledTimes(1);
    // Verify we cannot go back as there's no more history
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Cannot go back'
    );

    // The go back button is now disabled, so a click won't do anything.
    // The flyout should still be open.
    fireEvent.click(screen.getByTestId('goBackButton'));
    expect(onGoBack).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
  });

  test('goBack navigates through the history stack and restores previous flyouts', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // Open first flyout (A)
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    // Verify the content is rendered by checking the element exists and has content
    expect(screen.getByTestId('mainFlyoutContent')).toBeTruthy();
    expect(screen.getByTestId('mainFlyoutContent').textContent).toContain(
      '"type":"test"'
    );

    // Open second flyout (B), which should push A to history
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    // Verify the main flyout is still open
    expect(screen.getByTestId('mainFlyoutContent')).toBeTruthy();
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Can go back'
    );

    // Go back to first flyout (A)
    fireEvent.click(screen.getByTestId('goBackButton'));

    // Should still have a flyout open (first one)
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Cannot go back'
    );

    // The go back button is now disabled, so a click won't do anything.
    fireEvent.click(screen.getByTestId('goBackButton'));
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
  });

  test('clearHistory closes all flyouts', () => {
    const onClearHistory = jest.fn();
    render(
      <TestWrapper>
        <TestComponent onClearHistory={onClearHistory} />
      </TestWrapper>
    );

    // Open both flyouts
    fireEvent.click(screen.getByTestId('openFlyoutGroupButton'));

    // Clear history should close everything
    fireEvent.click(screen.getByTestId('clearHistoryButton'));

    expect(onClearHistory).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is closed'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is closed'
    );
    expect(screen.getByTestId('canGoBackStatus').textContent).toBe(
      'Cannot go back'
    );
  });

  test('isFlyoutOpen and isChildFlyoutOpen correctly reflect state', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // Initially both are closed
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is closed'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is closed'
    );

    // Open main flyout
    fireEvent.click(screen.getByTestId('openFlyoutButton'));
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is closed'
    );

    // Open child flyout
    fireEvent.click(screen.getByTestId('openChildFlyoutButton'));
    expect(screen.getByTestId('flyoutStatus').textContent).toBe(
      'Flyout is open'
    );
    expect(screen.getByTestId('childFlyoutStatus').textContent).toBe(
      'Child flyout is open'
    );
  });
});
