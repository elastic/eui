/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';
import { requiredProps } from '../../../../test';

import { EuiCollapsedNavItem } from './collapsed_nav_item';

describe('EuiCollapsedNavItem', () => {
  it('renders a popover if items are passed', () => {
    const { container } = render(
      <EuiCollapsedNavItem
        {...requiredProps}
        title="Item"
        items={[{ title: 'Sub-item' }]}
      />
    );

    expect(container.firstChild).toHaveClass('euiPopover');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders an icon button/link if href is passed', () => {
    const { container } = render(
      <EuiCollapsedNavItem {...requiredProps} title="Item" href="#" />
    );

    expect(container.firstChild).toHaveClass('euiToolTipAnchor');
    expect(container.firstChild).toMatchSnapshot();
  });
});
