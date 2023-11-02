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
  shouldRenderCustomStyles(
    <EuiCollapsedNavPopover
      title="title"
      items={[{ title: 'subitem' }]}
      isCollapsible={false}
      href="#"
    />,
    {
      childProps: ['linkProps'],
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.click(getByTestSubject('euiCollapsedNavButton'));
        await waitForEuiPopoverOpen();
      },
    }
  );

  it('renders the title and sub-items within the popover', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCollapsedNavPopover
        {...requiredProps}
        title="Item"
        href="#"
        linkProps={{ 'data-test-subj': 'popoverTitle' }}
        items={[
          { title: 'Sub-item A', href: '#', 'data-test-subj': 'A' },
          { title: 'Sub-item B', href: '#', 'data-test-subj': 'B' },
        ]}
        // Non-collapsible groups allow link titles
        isCollapsible={false}
      />
    );
    fireEvent.click(getByTestSubject('euiCollapsedNavButton'));
    await waitForEuiPopoverOpen();

    expect(baseElement).toMatchSnapshot();
    expect(getByTestSubject('popoverTitle')).toHaveTextContent('Item');
    expect(getByTestSubject('A')).toHaveTextContent('Sub-item A');
    expect(getByTestSubject('B')).toHaveTextContent('Sub-item B');

    fireEvent.keyDown(baseElement, { key: 'Escape' });
    await waitForEuiPopoverClose();
  });

  it('renders popover titles without links', async () => {
    const { getByText, getByTestSubject } = render(
      <EuiCollapsedNavPopover
        {...requiredProps}
        title="Popover title"
        titleElement="h3"
        items={[{ title: 'Subitem' }]}
        // Accordions do not allow link titles (carryover from desktop non-collapsed behavior)
        href="#"
        linkProps={requiredProps}
      />
    );
    fireEvent.click(getByTestSubject('euiCollapsedNavButton'));
    await waitForEuiPopoverOpen();

    expect(getByText('Popover title')).toMatchInlineSnapshot(`
      <h3
        class="eui-textTruncate emotion-euiCollapsedNavPopover__title-span"
      >
        Popover title
      </h3>
    `);
  });
});
