/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiCollapsibleNavContext } from './context';
import {
  EuiCollapsibleNavBody,
  EuiCollapsibleNavFooter,
} from './collapsible_nav_body_footer';

describe('EuiCollapsibleNavBody', () => {
  shouldRenderCustomStyles(<EuiCollapsibleNavBody />);

  it('renders', () => {
    const { container } = render(<EuiCollapsibleNavBody {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with docked styles', () => {
    const { container } = render(
      <EuiCollapsibleNavContext.Provider
        value={{
          isPush: true,
          isCollapsed: true,
          isOverlayOpen: false,
          side: 'left',
        }}
      >
        <EuiCollapsibleNavBody {...requiredProps} />
      </EuiCollapsibleNavContext.Provider>
    );

    expect(container.innerHTML).toContain('isPushCollapsed');
  });
});

describe('EuiCollapsibleNavFooter', () => {
  shouldRenderCustomStyles(<EuiCollapsibleNavFooter />);

  it('renders', () => {
    const { container } = render(
      <EuiCollapsibleNavFooter {...requiredProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
