import React, { ReactElement } from 'react';

import { EuiPageHeader, EuiPageSection } from '../../../../../src/components';

export default ({
  content = <></>,
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
      <EuiPageSection restrictWidth={width} bottomBorder={bottomBorder}>
        <EuiPageHeader
          pageTitle="Page title"
          description="Wrapping your EuiPageHeader with EuiPageSection will ensure proper stacking alongside other EuiPageSections."
        />
      </EuiPageSection>
      <EuiPageSection
        restrictWidth={width}
        color="subdued"
        bottomBorder={bottomBorder}
      >
        NESTED
      </EuiPageSection>
      <EuiPageSection
        restrictWidth={width}
        alignment={centeredContent ? 'center' : 'top'}
        color={extendedBorder ? 'plain' : 'transparent'}
        grow={centeredContent ? true : false}
      >
        {content}
      </EuiPageSection>
    </>
  );
};
