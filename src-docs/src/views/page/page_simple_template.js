import React from 'react';

import { EuiPageTemplate } from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPageTemplate
    pageHeader={{
      pageTitle: 'Page title',
      rightSideItems: [button],
    }}>
    {content}
  </EuiPageTemplate>
);
