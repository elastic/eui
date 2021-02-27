import React from 'react';

import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <EuiPageHeader alignItems="center">
    <EuiPageHeaderSection>
      <EuiTitle size="l">
        <h1>Page title</h1>
      </EuiTitle>
    </EuiPageHeaderSection>
    <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
  </EuiPageHeader>
);
