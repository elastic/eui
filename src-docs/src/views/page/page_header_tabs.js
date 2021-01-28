import React from 'react';

import {
  EuiPageHeader,
  EuiText,
  EuiButton,
  EuiPageHeaderContent,
} from '../../../../src/components';

export default () => (
  <>
    <EuiPageHeader
      tabs={[
        {
          label: 'Tab 1',
          isSelected: true,
        },
        {
          label: 'Tab 2',
        },
      ]}
      description="The right side, rightSideContent, allows for just a simple array of nodes which are placed within a flexbox row. This is usually in the form of multiple buttons, of which, at least one is primary. These items are also displayed in reverse order so that the first and primary action should be first in the list."
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
    <EuiPageHeaderContent
      tabs={[
        {
          label: 'Tab 1',
          isSelected: true,
        },
        {
          label: 'Tab 2',
        },
      ]}
      description="The right side, rightSideContent, allows for just a simple array of nodes which are placed within a flexbox row. This is usually in the form of multiple buttons, of which, at least one is primary. These items are also displayed in reverse order so that the first and primary action should be first in the list."
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
  </>
);
