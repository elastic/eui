/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { waitFor } from '@testing-library/react';
import { WaitForOptions } from '../../utils/rtl/internal';
import { EuiPopoverSelectors } from './selectors';

/**
 * Whether the <EuiPopover> is currently open
 */
const isOpen = (container?: HTMLElement) => {
  const target = container ?? document;

  return !!target.querySelector(EuiPopoverSelectors.OPEN);
};

/**
 * Wait until the <EuiPopover> is open
 *
 * To open the popover fire the native click event on the popover anchor element
 * (the element passed to `button` prop)
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import { fireEvent, render, screen } from '@testing-library/react';
 * import { EuiPopover } from '@elastic/eui';
 *
 * const Demo = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <EuiPopover
 *       button={<button onClick={() => setIsOpen(true)}>Show details</button>}
 *     >
 *       User details go here
 *     </EuiPopover>
 *   );
 * };
 *
 * it('renders details in popover', async () => {
 *   render(<Demo />);
 *
 *   fireEvent.click(screen.getByText('Show details'));
 *
 *   await EuiPopoverTestHelpers.waitForOpen();
 *
 *   expect(screen.getByText('User details go here')).toBeInTheDocument();
 * });
 * ```
 */
const waitForOpen = (
  container?: HTMLElement,
  options?: WaitForOptions,
) => {
  return waitFor(() => {
    expect(isOpen(container)).toBeTruthy();
  }, options);
};

/**
 * Wait until the <EuiPopover> is closed
 *
 * To close the popover fire the native click event on the popover anchor element
 * (the element passed to `button` prop)
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import { fireEvent, render, screen } from '@testing-library/react';
 * import { EuiPopover } from '@elastic/eui';
 *
 * const Demo = () => {
 *   const [isOpen, setIsOpen] = useState(true);
 *
 *   return (
 *     <EuiPopover
 *       button={<button onClick={() => setIsOpen(true)}>Show details</button>}
 *     >
 *       User details go here
 *     </EuiPopover>
 *   );
 * };
 *
 * it('renders details in popover', async () => {
 *   render(<Demo />);
 *
 *   // EuiPopover is open by default
 *   expect(screen.getByText('User details go here')).toBeInTheDocument();
 *   fireEvent.click(screen.getByText('Show details'));
 *
 *   await EuiPopoverTestHelpers.waitForClosed();
 *
 *   expect(screen.queryByText('User details go here')).not.toBeInTheDocument();
 * });
 * ```
 */
const waitForClosed = (
  container?: HTMLElement,
  options?: WaitForOptions,
) => {
  return waitFor(() => {
    expect(isOpen(container)).toBeFalsy();
  }, options);
};

export const EuiPopoverTestHelpers = {
  isOpen,
  waitForOpen,
  waitForClosed,
};
