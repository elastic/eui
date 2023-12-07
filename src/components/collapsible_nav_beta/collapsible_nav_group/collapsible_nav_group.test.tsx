/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsibleNavGroup } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  const sharedProps = {
    title: 'Group',
    items: [{ title: 'Item' }],
    icon: 'home',
  };

  shouldRenderCustomStyles(<EuiCollapsibleNavGroup {...sharedProps} />, {
    skip: { style: true }, // Spread to a different location than className and CSS
  });
  shouldRenderCustomStyles(<EuiCollapsibleNavGroup {...sharedProps} />, {
    targetSelector: '.euiCollapsibleNavItem',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(<EuiCollapsibleNavGroup {...sharedProps} />, {
    childProps: ['wrapperProps'],
    skip: { parentTest: true },
  });

  it('renders', () => {
    const { container } = render(
      <EuiCollapsibleNavGroup {...sharedProps} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as a docked button icon', () => {
    const { container } = render(
      <EuiCollapsibleNavContext.Provider
        value={{
          isCollapsed: true,
          isPush: true,
          isOverlayOpen: false,
          side: 'left',
        }}
      >
        <EuiCollapsibleNavGroup {...sharedProps} />
      </EuiCollapsibleNavContext.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
