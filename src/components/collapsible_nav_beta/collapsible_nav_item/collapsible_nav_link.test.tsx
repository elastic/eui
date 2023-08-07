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

import { EuiCollapsibleNavLink } from './collapsible_nav_link';

describe('EuiCollapsibleNavLink', () => {
  shouldRenderCustomStyles(
    <EuiCollapsibleNavLink>Link</EuiCollapsibleNavLink>,
    { childProps: ['linkProps'] }
  );

  it('renders a link', () => {
    const { container } = render(
      <EuiCollapsibleNavLink
        href="#"
        rel="noopener"
        linkProps={{ target: '_blank', ...requiredProps }}
        {...requiredProps}
      >
        Link
      </EuiCollapsibleNavLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a button if an onClick is passed but not a href', () => {
    const { container } = render(
      <EuiCollapsibleNavLink onClick={() => {}} isNotAccordion>
        Link
      </EuiCollapsibleNavLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as a static span if `isInteractive` is false', () => {
    const { container } = render(
      <EuiCollapsibleNavLink isInteractive={false} isNotAccordion>
        Link
      </EuiCollapsibleNavLink>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not spread `linkProps` to static spans', () => {
    const { container } = render(
      <EuiCollapsibleNavLink
        isInteractive={false}
        linkProps={{ className: 'test' }}
      >
        Link
      </EuiCollapsibleNavLink>
    );

    expect(container.querySelector('.test')).not.toBeInTheDocument();
  });
});
