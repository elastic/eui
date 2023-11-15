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
 * Ensure the EuiToolTip being tested is open and visible before continuing
 */
export const waitForEuiToolTipVisible = async () =>
  await waitFor(
    () => {
      const tooltip = document.querySelector('.euiToolTipPopover');
      expect(tooltip).toBeVisible();
    },
    { timeout: 3000 } // Account for long delay on tooltips
  );

export const waitForEuiToolTipHidden = async () =>
  await waitFor(() => {
    const tooltip = document.querySelector('.euiToolTipPopover');
    expect(tooltip).toBeNull();
  });

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
