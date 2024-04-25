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

import { EuiCollapsibleNavGroup } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  const props = {
    header: 'Header',
    items: [{ title: 'sub item' }],
  };

  shouldRenderCustomStyles(<EuiCollapsibleNavGroup {...props} />);

  it('renders as a top level item', () => {
    const { container } = render(
      <EuiCollapsibleNavGroup {...requiredProps} {...props} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as a sub item', () => {
    const { container } = render(
      <EuiCollapsibleNavGroup {...props} isSubItem />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the header as selected', () => {
    const { container } = render(
      <EuiCollapsibleNavGroup {...props} isSelected />
    );
    const header = container.querySelector('.euiCollapsibleNavLink');
    expect(header?.className).toContain('isSelected');
  });
});
