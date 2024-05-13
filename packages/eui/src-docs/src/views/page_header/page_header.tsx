import React from 'react';

import { EuiPageHeader, EuiButton } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    pageTitle="Page title"
    iconType="logoKibana"
    description="This description should be describing the current page as depicted by the page title. It will never extend beneath the right side content."
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
  />
);
