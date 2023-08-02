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

import { EuiBreadcrumbContent } from './breadcrumb';

describe('EuiBreadcrumbContent', () => {
  it('renders plain uninteractive breadcrumb text', () => {
    const { container, getByText } = render(
      <>
        <EuiBreadcrumbContent type="page" text="Text" />
      </>
    );
    expect(getByText('Text').nodeName).toEqual('SPAN');
    expect(container).toMatchSnapshot();
  });

  it('renders interactive breadcrumbs with href or onClick', () => {
    const { container, getByText } = render(
      <>
        <EuiBreadcrumbContent type="page" text="Link" href="#" />
        <EuiBreadcrumbContent type="page" text="Button" onClick={() => {}} />
      </>
    );
    expect(getByText('Link').nodeName).toEqual('A');
    expect(getByText('Button').nodeName).toEqual('BUTTON');
    expect(container).toMatchSnapshot();
  });

  it('renders breadcrumbs with `popoverContent` with popovers', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiBreadcrumbContent
        type="page"
        text="Toggles a popover"
        data-test-subj="popoverToggle"
        popoverContent="Hello popover world"
        popoverProps={{ 'data-test-subj': 'popover' }}
      />
    );
    fireEvent.click(getByTestSubject('popoverToggle'));
    await waitForEuiPopoverOpen();

    expect(getByTestSubject('popover')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
