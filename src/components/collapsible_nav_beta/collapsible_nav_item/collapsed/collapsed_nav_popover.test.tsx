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
});
