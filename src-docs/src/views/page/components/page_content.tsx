import React, { ReactElement } from 'react';

import { EuiPageContent, EuiPageHeader } from '../../../../../src/components';

export default ({
  content,
  extendedBorder,
  restrictWidth,
  centeredContent,
}: {
  content: ReactElement;
  extendedBorder?: boolean;
  restrictWidth?: boolean;
  centeredContent?: boolean;
}) => {
  const width = restrictWidth ? '75%' : false;
  const bottomBorder = extendedBorder ? 'extended' : true;

  return (
    <>
      <EuiPageHeader
        restrictWidth={width}
        bottomBorder={bottomBorder}
        pageTitle="Page title"
        description="This EuiPageHeader uses similar border and restricted width props as EuiPageContent."
      />
      <EuiPageContent
        restrictWidth={width}
        color="subdued"
        bottomBorder={bottomBorder}
        grow={false}
      >
        Secondary content with subdued background.
      </EuiPageContent>
      <EuiPageContent
        restrictWidth={width}
        position={centeredContent ? 'center' : 'top'}
        panelled={extendedBorder}
      >
        {content}
      </EuiPageContent>
    </>
  );
};
