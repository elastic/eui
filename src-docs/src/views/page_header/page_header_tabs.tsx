import React from 'react';

import { EuiPageHeader } from '../../../../src/components';

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
    description="This description should be describing the current page as depicted by the current tab. It has grow set to false to ensure a readable line-length."
    bottomBorder
  />
);
