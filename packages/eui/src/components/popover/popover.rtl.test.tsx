/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  screen,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiPopover } from './';

describe('EuiPopover', () => {
  describe('snapshot testing', () => {
    it('renders', () => {
      const { baseElement } = render(
        <EuiPopover
          button={<button />}
          closePopover={() => {}}
          {...requiredProps}
        />
      );

      // NOTE: Using baseElement instead of container is required for components that use portals
      expect(baseElement).toMatchSnapshot();
    });

    it('renders with popover contents', () => {
      const { baseElement } = render(
        <EuiPopover
          button={<button />}
          closePopover={() => {}}
          isOpen={true}
          {...requiredProps}
        >
          Hello world
        </EuiPopover>
      );

      expect(baseElement).toMatchSnapshot();
    });
  });

  const mockPopoverInteraction = jest.fn();
  const MockPopoverComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const togglePopover = () => setIsOpen(!isOpen);
    const closePopover = () => setIsOpen(false);

    return (
      <EuiPopover
        button={<button onClick={togglePopover}>Open popover</button>}
        closePopover={closePopover}
        isOpen={isOpen}
        data-test-subj="popover"
      >
        <span data-test-subj="fff">Popover content</span>
        <button onClick={mockPopoverInteraction}>Button inside popover</button>
      </EuiPopover>
    );
  };

  describe('open/close behavior', () => {
    it('opens the popover, contents', () => {
      render(<MockPopoverComponent />);

      expect(screen.queryByText('Popover content')).toBeFalsy();

      fireEvent.click(screen.getByText('Open popover'));

      expect(screen.queryByText('Popover content')).toBeTruthy();
    });

    it('allows interacting with popover children', async () => {
      render(<MockPopoverComponent />);

      fireEvent.click(screen.getByText('Open popover'));
      await waitForEuiPopoverOpen();

      fireEvent.click(screen.getByText('Button inside popover'));
      expect(mockPopoverInteraction).toHaveBeenCalledTimes(1);
    });

    it('closes the popover on escape key press', async () => {
      render(<MockPopoverComponent />);

      fireEvent.click(screen.getByText('Open popover'));
      await waitForEuiPopoverOpen();

      fireEvent.keyDown(screen.getByTestSubject('popover'), {
        key: 'Escape',
      });

      await waitForEuiPopoverClose();
    });
  });
});
