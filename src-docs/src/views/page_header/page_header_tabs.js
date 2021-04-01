import React from 'react';

import {
  EuiPageHeader,
  EuiText,
  EuiButton,
  EuiCode,
} from '../../../../src/components';

export default () => (
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
    description="This description should be describing the currently selected tab. It has the grow prop set to false on the EuiText block so that it is the proper line length. And it will also never extend beneath the right side content (buttons)."
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}>
    <EuiText>
      <p>
        This custom content (children), on the other hand, exists below the
        content above including below the right side content and therefore will
        stretch beneath them. Unless you set the <EuiCode>alignItems</EuiCode>{' '}
        prop to something other than <EuiCode>top</EuiCode>.
      </p>
    </EuiText>
  </EuiPageHeader>
);
