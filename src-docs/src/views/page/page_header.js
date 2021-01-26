import React from 'react';

import { EuiPageHeader, EuiText, EuiButton } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    pageTitle="Page title"
    iconType="logoKibana"
    tabs={[
      {
        label: 'Tab 1',
        isSelected: true,
      },
      {
        label: 'Tab 2',
      },
    ]}
    description="Page description goes here."
    leftSideContent={
      <EuiText>
        <p>And some custom content</p>
      </EuiText>
    }
    rightSideContent={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
    alignItems="top"
  />
);
