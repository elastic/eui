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

import { EuiHeader } from '../header';

import { EuiCollapsibleNavBeta } from './collapsible_nav_beta';

describe('EuiCollapsibleNavBeta', () => {
  shouldRenderCustomStyles(<EuiCollapsibleNavBeta />);

  it('renders', () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCollapsibleNavBeta {...requiredProps} data-test-subj="nav">
        Nav content
      </EuiCollapsibleNavBeta>
    );
    expect(getByTestSubject('nav')).toHaveStyle({ 'inline-size': '248px' });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders initialIsCollapsed', () => {
    const { queryByTestSubject } = render(
      <EuiCollapsibleNavBeta data-test-subj="nav" initialIsCollapsed={true}>
        Nav content
      </EuiCollapsibleNavBeta>
    );
    expect(queryByTestSubject('nav')).not.toBeInTheDocument();
  });

  it('automatically accounts for fixed EuiHeaders in its positioning', () => {
    const { getByTestSubject } = render(
      <EuiHeader position="fixed">
        <EuiCollapsibleNavBeta data-test-subj="nav">
          Nav content
        </EuiCollapsibleNavBeta>
      </EuiHeader>
    );
    expect(getByTestSubject('nav')).toHaveStyle({
      'inset-block-start': '48px',
      'block-size': 'calc(100% - 48px)',
    });
  });

  // TODO: Visual snapshot for left vs right `side` prop, once we add visual snapshot testing
});
