import React, { ReactElement } from 'react';

import { EuiPageHeader, EuiPageSection } from '../../../../src/components';

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
      <EuiPageHeader
        paddingSize="l"
        restrictWidth={width}
        bottomBorder={bottomBorder}
        pageTitle="Page title"
        description="EuiPageHeader accepts similar border, restrict width and padding props as EuiPageSection."
      />
      <EuiPageSection
        restrictWidth={width}
        color="subdued"
        bottomBorder={bottomBorder}
      >
        Secondary content
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
