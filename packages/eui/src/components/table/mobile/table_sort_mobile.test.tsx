/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';
import {
  render,
  screen,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';

import { EuiTableSortMobile } from './table_sort_mobile';

describe('EuiTableSortMobile', () => {
  shouldRenderCustomStyles(<EuiTableSortMobile />, {
    skip: { style: true },
  });

  test('is rendered', () => {
    const { container } = render(<EuiTableSortMobile {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('behavior', () => {
    it('opens and closes the popover', async () => {
      render(
        <EuiTableSortMobile
          data-test-subj="mobileSortPopover"
          items={[{ name: 'Name', key: 'name' }]}
        />
      );

      const button = screen.getByRole('button', { name: 'Sorting' });
      expect(screen.queryByText('Name')).not.toBeInTheDocument();

      fireEvent.click(button);
      await waitForEuiPopoverOpen();

      expect(screen.getByText('Name')).toBeInTheDocument();

      fireEvent.keyDown(screen.getByTestSubject('mobileSortPopover'), {
        key: 'Escape',
      });
      await waitForEuiPopoverClose();
    });

    it('calls item onSort handlers', async () => {
      const onSort = jest.fn();

      render(
        <EuiTableSortMobile items={[{ name: 'Name', onSort, key: 'name' }]} />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Sorting' }));
      await waitForEuiPopoverOpen();

      fireEvent.click(screen.getByText('Name'));
      expect(onSort).toHaveBeenCalledTimes(1);
    });
  });
});
