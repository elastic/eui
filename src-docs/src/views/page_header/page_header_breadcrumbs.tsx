import React from 'react';

import { EuiPageHeader, EuiButton } from '../../../../src/components';

export default () => (
  <EuiPageHeader
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
      <EuiButton fill iconType="plusInCircleFilled">
        Add something
      </EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
  />
);
