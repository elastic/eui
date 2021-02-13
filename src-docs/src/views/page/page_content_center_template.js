import React from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../src/components';

export default ({ button, content }) => {
  return (
    <EuiPageTemplate
      template="centeredBody"
      pageHeader={{
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        paddingSize: 'l',
      }}>
      <EuiEmptyPrompt
        title={<span>No spice</span>}
        body={content}
        actions={button}
      />
    </EuiPageTemplate>
  );
};
