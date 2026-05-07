/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import '@testing-library/jest-dom';
import { waitFor, fireEvent } from '@testing-library/react';
import { screen } from './custom_render';

/**
 * Ensure the EuiPopover being tested is open/closed before continuing
 * Note: Because EuiPopover is portalled, we want to query `document`
 * instead of the `container` returned by RTL's render()
 */
export const waitForEuiPopoverOpen = async () =>
  await waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeTruthy();
  });

export const waitForEuiPopoverClose = async () =>
  await waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeFalsy();
  });

/**
 * jsdom does not track keyboard vs. mouse input modality, so `:focus-visible`
 * always returns false. Call this before `fireEvent.focus()` on an element that
 * should be treated as keyboard-focused.
 *
 * Returns a cleanup function, call it after test assertions to restore the spy.
 */
export const simulateFocusVisible = (element: Element): (() => void) => {
  const originalMatches = Element.prototype.matches.bind(element);
  const spy = jest
    .spyOn(element, 'matches')
    .mockImplementation((selector: string) =>
      selector === ':focus-visible' ? true : originalMatches(selector)
    );

  return () => spy.mockRestore();
};

/**
 * Prefer this over `fireEvent.focus()` in tooltip tests. Plain `fireEvent.focus`
 * does not set `:focus-visible` in jsdom and will not trigger the tooltip.
 *
 * Returns a cleanup function to restore the mock after assertions.
 */
export const focusEuiToolTipTrigger = (element: Element): (() => void) => {
  const cleanup = simulateFocusVisible(element);

  fireEvent.focus(element);

  return cleanup;
};

/**
 * EuiComboBox
 */

export const showEuiComboBoxOptions = async () => {
  fireEvent.click(screen.getByTestSubject('comboBoxToggleListButton'));
  await waitForEuiPopoverOpen();
  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
};

/**
 * EuiContextMenu
 */

export const waitForEuiContextMenuPanelTransition = async () => {
  // Used document instead of container or screen due to context menus living in portals
  const getPanels = () => document.querySelectorAll('.euiContextMenuPanel');

  // 2 panels will appear for the transition animation
  await waitFor(() => {
    expect(getPanels().length).toEqual(2);
  });

  // Outgoing panel will be removed on animation end
  fireEvent.animationEnd(getPanels()[0]);
  if (getPanels().length > 1) {
    fireEvent.animationEnd(getPanels()[1]);
  }

  // Transition/animation is done once we're back to 1 panel
  expect(getPanels().length).toEqual(1);
};
