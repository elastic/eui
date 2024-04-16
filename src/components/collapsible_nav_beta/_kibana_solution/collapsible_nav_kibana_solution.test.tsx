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
import { KibanaCollapsibleNavSolution } from './collapsible_nav_kibana_solution';

describe('KibanaCollapsibleNavSolution', () => {
  const sharedProps = {
    title: 'Group',
    items: [{ title: 'Item' }],
    icon: 'home',
  };

  shouldRenderCustomStyles(<KibanaCollapsibleNavSolution {...sharedProps} />, {
    skip: { style: true }, // Spread to a different location than className and CSS
  });
  shouldRenderCustomStyles(<KibanaCollapsibleNavSolution {...sharedProps} />, {
    targetSelector: '.euiCollapsibleNavItem',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(<KibanaCollapsibleNavSolution {...sharedProps} />, {
    childProps: ['wrapperProps'],
    skip: { parentTest: true },
  });

  it('renders', () => {
    const { container } = render(
      <KibanaCollapsibleNavSolution {...sharedProps} {...requiredProps} />
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
        <KibanaCollapsibleNavSolution {...sharedProps} />
      </EuiCollapsibleNavContext.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
