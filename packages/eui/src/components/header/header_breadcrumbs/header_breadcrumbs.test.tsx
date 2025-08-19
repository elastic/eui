/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';

const breadcrumbs = [
  {
    text: 'Animals',
    href: '#',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Animals');
    },
    'data-test-subj': 'breadcrumbsAnimals',
    className: 'customClass',
  },
  {
    text: 'Reptiles',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log('You clicked Reptiles');
    },
  },
  {
    text: 'Boa constrictor',
    href: '#',
  },
  {
    text: 'Edit',
  },
];

describe('EuiHeaderBreadcrumbs', () => {
  shouldRenderCustomStyles(
    <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} {...requiredProps} />
  );

  it('is rendered', () => {
    const { container } = render(
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders only one breadcrumb with all rounded corners', () => {
    const breadcrumbs = [{ text: 'Home' }];

    const { container } = render(
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
