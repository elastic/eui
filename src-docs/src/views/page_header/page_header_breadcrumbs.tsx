import React from 'react';
import { requiredProps } from '../../../../src/test';

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
        onClick: (e: { preventDefault: () => void }) => {
          e.preventDefault();
        },
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
        onClick: (e: { preventDefault: () => void }) => {
          e.preventDefault();
        },
      },
      {
        text: 'Current',
        href: '#',
        onClick: (e: { preventDefault: () => void }) => {
          e.preventDefault();
        },
      },
    ]}
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
    breadcrumbProps={requiredProps}
  />
);
