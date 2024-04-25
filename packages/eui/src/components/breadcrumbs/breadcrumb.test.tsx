/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiPopoverOpen } from '../../test/rtl';

import { EuiBreadcrumb, EuiBreadcrumbCollapsed } from './breadcrumb';

describe('EuiBreadcrumb', () => {
  it('is a light <li> wrapper around the content', () => {
    const { container } = render(
      <EuiBreadcrumb type="page" truncate={true}>
        Hello world
      </EuiBreadcrumb>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('EuiBreadcrumbCollapsed', () => {
  it('renders a ... breadcrumb with collapsed content in a popover', () => {
    const { getByRole, getByText, baseElement } = render(
      <EuiBreadcrumbCollapsed type="application">
        I render inside the popover
      </EuiBreadcrumbCollapsed>
    );
    fireEvent.click(getByRole('button'));
    waitForEuiPopoverOpen();
    expect(getByText('I render inside the popover')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
