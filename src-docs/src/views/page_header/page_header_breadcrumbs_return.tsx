import React from 'react';

import { EuiPageHeader, EuiButton, EuiIcon } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    bottomBorder
    pageTitle="Page title"
    description="Example of a description."
    breadcrumbs={[
      {
        text: (
          <>
            <EuiIcon size="s" type="arrowLeft" /> Return
          </>
        ),
        href: '#',
        color: 'primary',
        'aria-current': false,
      },
    ]}
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
  />
);
