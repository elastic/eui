import React from 'react';

import { EuiPageHeader, EuiButton } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    pageTitle="Page title"
    tabs={[
      {
        label: 'Tab 1',
        isSelected: true,
      },
      {
        label: 'Tab 2',
      },
    ]}
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
    bottomBorder
  />
);
