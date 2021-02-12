import React from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiPageHeader,
} from '../../../../src/components';

export default ({ button, content }) => (
  <EuiPage paddingSize="none" direction="column">
    <EuiPageHeader pageTitle="Page title" rightSideItems={[button]} />
    <EuiPageContent borderRadius="none" hasShadow={false}>
      {content}
    </EuiPageContent>
  </EuiPage>
);
