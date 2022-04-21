import React from 'react';

import { EuiPageHeader, EuiButton, EuiIcon } from '../../../../src/components';

export default () => (
  <EuiPageHeader
    pageTitle="Page title"
    description="Example of a description."
    breadcrumbs={[
      {
        text: (
          <>
            <EuiIcon size="s" type="arrowLeft" /> Return
          </>
        ),
        color: 'primary',
        'aria-current': false,
        href: '#',
        onClick: (e) => e.preventDefault(),
      },
    ]}
    rightSideItems={[
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ]}
  />
);
