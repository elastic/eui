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
} from '../../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../../test/internal';
import { requiredProps } from '../../../../test';

import { EuiCollapsedNavPopover } from './collapsed_nav_popover';

describe('EuiCollapsedNavPopover', () => {
  shouldRenderCustomStyles(
    <EuiCollapsedNavPopover title="title" items={[{ title: 'subitem' }]} />
  );

  it('renders', async () => {
    const { baseElement, getByTestSubject, getByText } = render(
      <EuiCollapsedNavPopover
        {...requiredProps}
        title="Item"
        titleElement="h3"
        items={[
          { title: 'Sub-item A', href: '#', 'data-test-subj': 'A' },
          { title: 'Sub-item B', href: '#', 'data-test-subj': 'B' },
        ]}
      />
    );
    fireEvent.click(getByTestSubject('euiCollapsedNavButton'));
    await waitForEuiPopoverOpen();

    expect(baseElement).toMatchSnapshot();
    expect(getByText('Item').nodeName).toEqual('H3');
    expect(getByTestSubject('A')).toHaveTextContent('Sub-item A');
    expect(getByTestSubject('B')).toHaveTextContent('Sub-item B');

    fireEvent.keyDown(baseElement, { key: 'Escape' });
    await waitForEuiPopoverClose();
  });

  it('closes the popover when clicking on a link', async () => {
    const onClick = jest.fn();
    const { getByTestSubject } = render(
      <EuiCollapsedNavPopover
        {...requiredProps}
        title="Item"
        titleElement="h3"
        items={[
          { title: 'Sub-item A', onClick, 'data-test-subj': 'A' },
          { title: 'Sub-item B', href: '#', 'data-test-subj': 'B' },
        ]}
      />
    );
    fireEvent.click(getByTestSubject('euiCollapsedNavButton'));
    await waitForEuiPopoverOpen();

    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(getByTestSubject('A'));

    await waitForEuiPopoverClose(); // popover should close
    expect(onClick).toHaveBeenCalledTimes(1); // custom onClick should be called
  });
});
