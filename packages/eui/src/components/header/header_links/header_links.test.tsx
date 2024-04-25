/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../../test/rtl';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiHeaderLinks, GUTTER_SIZES } from './header_links';

describe('EuiHeaderLinks', () => {
  shouldRenderCustomStyles(<EuiHeaderLinks popoverBreakpoints="all" />, {
    childProps: ['popoverButtonProps', 'popoverProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiHeaderLinks {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('gutterSize', () => {
    GUTTER_SIZES.forEach((gutterSize) => {
      test(`${gutterSize} is rendered`, () => {
        const { container } = render(
          <EuiHeaderLinks gutterSize={gutterSize} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('mobile menu/popover', () => {
    it('renders various popover props', () => {
      const { container } = render(
        <EuiHeaderLinks
          popoverBreakpoints={['xs', 's', 'm', 'l', 'xl']}
          popoverButtonProps={{
            iconType: 'bolt',
            className: 'customButtonClass',
          }}
          popoverProps={{ 'data-test-subj': 'hello-world' }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('never renders a popover with "none" breakpoint', () => {
      const { container } = render(
        <EuiHeaderLinks popoverBreakpoints="none" />
      );

      expect(container.querySelector('.euiPopover')).toBeNull();
    });

    it('passes a callback that closes the menu/popover to children render props', () => {
      const { getByLabelText, getByText } = render(
        <EuiHeaderLinks popoverBreakpoints="all">
          {(closePopover) => (
            <a href="#" onClick={closePopover}>
              This link should close the popover
            </a>
          )}
        </EuiHeaderLinks>
      );

      fireEvent.click(getByLabelText('Open menu'));
      waitForEuiPopoverOpen();
      fireEvent.click(getByText('This link should close the popover'));
      waitForEuiPopoverClose();
    });
  });
});
