import React from 'react';

import { EuiPageHeader, EuiButton } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    bottomBorder
    pageTitle="Page title"
    description="Example of a description."
    breadcrumbs={[
      {
        text: 'Breadcrumb 1',
        href: '#',
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
      },
      {
        text: 'Current',
        href: '#',
      },
    ]}
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
  />
);
