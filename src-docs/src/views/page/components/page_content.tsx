import React, { ReactElement } from 'react';

import { EuiPageContent, EuiPageHeader } from '../../../../../src/components';

export default ({
  content,
  restrictWidth,
}: {
  content: ReactElement;
  restrictWidth?: boolean;
}) => {
  const width = restrictWidth ? '75%' : false;

  return (
    <>
      <EuiPageContent
        restrictWidth={width}
        template="pageHeader"
        border={restrictWidth ? 'bottomExtended' : 'bottom'}
      >
        <EuiPageHeader
          pageTitle="Page title"
          description="This EuiPageHeader is wrapped by EuiPageContent."
        />
      </EuiPageContent>
      <EuiPageContent restrictWidth={width} color="subdued" grow={false}>
        Secondary content with subdued background.
      </EuiPageContent>
      <EuiPageContent
        restrictWidth={width}
        template="default"
        border={restrictWidth ? 'topExtended' : 'top'}
      >
        {content}
      </EuiPageContent>
    </>
  );
};
