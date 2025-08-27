/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiButtonSplit } from './button_split';

const defaultButtonProps = {
  children: 'Main',
  onClick: jest.fn(),
};
const defaultIconButtonProps = {
  iconType: 'arrowDown',
  'aria-label': 'More actions',
};
const popoverMenu = jest.fn((_closePopover) => <div>Popover menu</div>);

describe('EuiButtonSplit', () => {
  shouldRenderCustomStyles(
    <EuiButtonSplit
      color="primary"
      buttonProps={defaultButtonProps}
      iconButtonProps={defaultIconButtonProps}
      popoverMenu={popoverMenu}
      {...requiredProps}
    />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiButtonSplit
        color="primary"
        buttonProps={defaultButtonProps}
        iconButtonProps={defaultIconButtonProps}
        popoverMenu={popoverMenu}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('popover open/close logic', () => {
    it('opens and closes the popover on icon button click', async () => {
      const popoverMenu = jest.fn((_closePopover) => <div>Popover menu</div>);
      const { getByLabelText, queryByText } = render(
        <EuiButtonSplit
          color="primary"
          buttonProps={defaultButtonProps}
          iconButtonProps={defaultIconButtonProps}
          popoverMenu={popoverMenu}
        />
      );
      // Popover menu should not be in the DOM initially
      expect(queryByText('Popover menu')).toBeNull();
      // Click icon button to open
      fireEvent.click(getByLabelText('More actions'));
      expect(queryByText('Popover menu')).toBeInTheDocument();
      // Click icon button again to close
      fireEvent.click(getByLabelText('More actions'));
      await waitFor(() => {
        expect(queryByText('Popover menu')).toBeNull();
      });
    });

    it('closes the popover when a menu item calls closePopover', async () => {
      const TestMenu = (closePopover: () => void) => (
        <button onClick={closePopover}>Close me</button>
      );
      const { getByLabelText, getByText, queryByText } = render(
        <EuiButtonSplit
          color="primary"
          buttonProps={defaultButtonProps}
          iconButtonProps={defaultIconButtonProps}
          popoverMenu={TestMenu}
        />
      );
      fireEvent.click(getByLabelText('More actions'));
      expect(getByText('Close me')).toBeInTheDocument();
      fireEvent.click(getByText('Close me'));
      await waitFor(() => {
        expect(queryByText('Close me')).toBeNull();
      });
    });
  });

  describe('props', () => {
    it('renders with isDisabled', () => {
      const { container } = render(
        <EuiButtonSplit
          color="primary"
          isDisabled
          buttonProps={defaultButtonProps}
          iconButtonProps={defaultIconButtonProps}
          popoverMenu={popoverMenu}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('calls main button onClick', () => {
      const onClick = jest.fn();
      const { getByText } = render(
        <EuiButtonSplit
          color="primary"
          buttonProps={{ ...defaultButtonProps, onClick }}
          iconButtonProps={defaultIconButtonProps}
          popoverMenu={popoverMenu}
        />
      );
      fireEvent.click(getByText('Main'));
      expect(onClick).toHaveBeenCalled();
    });

    describe('text color styling', () => {
      it('renders text color with fill=false (no margin, no left border)', () => {
        const { container } = render(
          <EuiButtonSplit
            color="text"
            fill={false}
            buttonProps={defaultButtonProps}
            iconButtonProps={defaultIconButtonProps}
            popoverMenu={popoverMenu}
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it('renders text color with fill=true (has margin, has left border)', () => {
        const { container } = render(
          <EuiButtonSplit
            color="text"
            fill={true}
            buttonProps={defaultButtonProps}
            iconButtonProps={defaultIconButtonProps}
            popoverMenu={popoverMenu}
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it('renders non-text color with fill=false (has margin, has left border)', () => {
        const { container } = render(
          <EuiButtonSplit
            color="primary"
            fill={false}
            buttonProps={defaultButtonProps}
            iconButtonProps={defaultIconButtonProps}
            popoverMenu={popoverMenu}
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
