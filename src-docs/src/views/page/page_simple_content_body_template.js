import React from 'react';

import { EuiPageTemplate, EuiEmptyPrompt } from '../../../../src/components';

export default ({ button = <></>, content }) => {
  return (
    <EuiPageTemplate
      template="centeredBody"
      pageContentProps={{ paddingSize: 'none' }}
    >
      <EuiEmptyPrompt
        title={<span>No spice</span>}
        body={content}
        actions={button}
      />
    </EuiPageTemplate>
  );
};
