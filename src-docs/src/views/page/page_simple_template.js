import React from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPageTemplate
    pageHeader={{
      rightSideItems: [button],
      tabs: [{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }],
    }}>
    {content}
  </EuiPageTemplate>
);
