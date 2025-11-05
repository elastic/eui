/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '../../test/rtl';

import { EuiButton } from '../button';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiFlyoutChild } from '.';

const mockGeneratedId = jest.fn((prefix) => `${prefix || 'generated'}TestId`);
jest.mock('../../services/accessibility/html_id_generator', () => ({
  ...jest.requireActual('../../services/accessibility/html_id_generator'),
  useGeneratedHtmlId: ({ prefix }: { prefix?: string } = {}) =>
    mockGeneratedId(prefix),
}));

const TestFlyoutWithChild: React.FC<{
  initialMainOpen?: boolean;
  initialChildOpen?: boolean;
}> = ({ initialMainOpen = false, initialChildOpen = false }) => {
  const [isMainOpen, setIsMainOpen] = useState(initialMainOpen);
  const [isChildOpen, setIsChildOpen] = useState(initialChildOpen);

  const mainFlyoutTitleId = 'main-flyout-title';
  const childFlyoutTitleId = 'child-flyout-title';

  return (
    <>
      {!isMainOpen && (
        <EuiButton onClick={() => setIsMainOpen(true)}>
          Open Main Flyout
        </EuiButton>
      )}
      {isMainOpen && (
        <EuiFlyout
          onClose={() => {
            setIsMainOpen(false);
            setIsChildOpen(false);
          }}
          aria-labelledby={mainFlyoutTitleId}
          data-test-subj="main-flyout"
          closeButtonProps={{
            'data-test-subj': 'main-flyout-close-button',
            'aria-label': 'Close main flyout',
          }}
        >
          <EuiFlyoutHeader>
            <h2 id={mainFlyoutTitleId}>Main Flyout</h2>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <p>Main content</p>
            <EuiButton data-test-subj="main-button-1" onClick={() => {}}>
              Main Button 1
            </EuiButton>
            {!isChildOpen && (
              <EuiButton
                data-test-subj="open-child-flyout-button"
                onClick={() => setIsChildOpen(true)}
              >
                Open Child Flyout
              </EuiButton>
            )}
            <EuiButton data-test-subj="main-button-2" onClick={() => {}}>
              Main Button 2
            </EuiButton>
          </EuiFlyoutBody>

          {isChildOpen && (
            <EuiFlyoutChild
              onClose={() => setIsChildOpen(false)}
              aria-labelledby={childFlyoutTitleId}
              data-test-subj="child-flyout"
            >
              <EuiFlyoutHeader>
                <h2 id={childFlyoutTitleId}>Child Flyout</h2>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                <p>Child content</p>
                <EuiButton data-test-subj="child-button-1" onClick={() => {}}>
                  Child Button 1
                </EuiButton>
                <EuiButton data-test-subj="child-button-2" onClick={() => {}}>
                  Child Button 2
                </EuiButton>
              </EuiFlyoutBody>
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </>
  );
};

describe('EuiFlyoutChild', () => {
  test('renders correctly with required children and proper ARIA attributes', () => {
    render(
      <TestFlyoutWithChild initialMainOpen={true} initialChildOpen={true} />
    );

    const mainFlyout = screen.getByTestSubject('main-flyout');
    const childFlyout = screen.getByTestSubject('child-flyout');

    expect(mainFlyout).toBeInTheDocument();
    expect(childFlyout).toBeInTheDocument();

    expect(childFlyout).toHaveAttribute('role', 'dialog');
    expect(childFlyout).toHaveAttribute('aria-modal', 'true');

    const childCloseButton = screen.getByTestSubject(
      'euiFlyoutChildCloseButton'
    );
    expect(childCloseButton).toBeInTheDocument();

    expect(screen.getByText('Child Flyout')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();

    expect(screen.getByTestSubject('child-button-1')).toBeInTheDocument();
    expect(screen.getByTestSubject('child-button-2')).toBeInTheDocument();
  });

  test('throws error when used outside of EuiFlyout', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(
        <EuiFlyoutChild
          onClose={() => {}}
          data-test-subj="standalone-child-flyout"
        >
          <EuiFlyoutBody>Required body content</EuiFlyoutBody>
        </EuiFlyoutChild>
      );
    }).toThrow('EuiFlyoutChild must be used as a child of EuiFlyout');

    console.error = originalConsoleError;
  });

  test('focus is trapped correctly and returns as expected', async () => {
    render(<TestFlyoutWithChild />);

    // 1. Open the main flyout and check the parent's focus trapping
    act(() => {
      userEvent.click(screen.getByText('Open Main Flyout'));
    });
    const mainFlyoutPanel = screen.getByTestSubject('main-flyout');
    const mainFlyoutCloseButton = screen.getByTestSubject(
      'main-flyout-close-button'
    );
    const openChildButton = screen.getByTestSubject('open-child-flyout-button');

    expect(
      document.activeElement === mainFlyoutPanel ||
        document.activeElement === mainFlyoutCloseButton
    ).toBe(true);

    // Hit tab a few times to ensure focus stays in parent. Land focus on the open child button
    act(() => {
      if (document.activeElement === mainFlyoutPanel) userEvent.tab(); // to main close button
      if (document.activeElement === mainFlyoutCloseButton) userEvent.tab(); // to main outer overflow
      userEvent.tab(); // from main outer overflow to main inner overflow
      userEvent.tab(); // from main body inner overflow to open child button
    });
    expect(document.activeElement).toBe(openChildButton);
    expect(mainFlyoutPanel.contains(document.activeElement)).toBe(true);

    // 2. Open the child flyout and check the child's focus trapping
    act(() => {
      userEvent.click(openChildButton);
    });
    const childFlyoutPanel = screen.getByTestSubject('child-flyout');
    const childFlyoutCloseButton = screen.getByTestSubject(
      'euiFlyoutChildCloseButton'
    );

    expect(
      document.activeElement === childFlyoutPanel ||
        document.activeElement === childFlyoutCloseButton
    ).toBe(true);
    expect(childFlyoutPanel.contains(document.activeElement)).toBe(true);

    // Hit tab a few times to ensure focus stays in child. Land focus on childButton1
    act(() => {
      if (document.activeElement === childFlyoutPanel) userEvent.tab(); // to child close
      if (document.activeElement === childFlyoutCloseButton) userEvent.tab(); // to child outer overflow
      userEvent.tab(); // from child outer overflow to child inner overflow
      userEvent.tab(); // from child body inner overflow to childButton1
    });
    const childButton1 = screen.getByTestSubject('child-button-1');
    expect(document.activeElement).toBe(childButton1);
    expect(childFlyoutPanel.contains(document.activeElement)).toBe(true);

    // Ensure focus is within the child flyout
    expect(childFlyoutPanel.contains(document.activeElement)).toBe(true);
    // Verify all interactive elements in the parent flyout are not focused
    const mainFlyoutButtons = screen.getAllByTestSubject(
      /main-button-\d+|open-child-flyout-button|main-flyout-close-button/
    );
    mainFlyoutButtons.forEach((button) => {
      expect(document.activeElement).not.toBe(button);
    });

    // 3. Close the child flyout and check the parent's focus
    act(() => {
      userEvent.click(childFlyoutCloseButton);
    });

    expect(document.activeElement).toBe(mainFlyoutPanel);
    expect(mainFlyoutPanel.contains(document.activeElement)).toBe(true);

    // Tab a few times to ensure focus is re-trapped in parent
    act(() => {
      if (document.activeElement === mainFlyoutPanel) userEvent.tab(); // to main close
      if (document.activeElement === mainFlyoutCloseButton) userEvent.tab(); // to main outer overflow
      userEvent.tab(); // from main outer overflow to main inner overflow
    });

    const mainButton1AfterChildClose = screen.getByTestSubject('main-button-1');
    expect(document.activeElement).toBe(mainButton1AfterChildClose);
    expect(mainFlyoutPanel.contains(document.activeElement)).toBe(true);
  });
});
