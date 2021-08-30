import React from 'react';

import {
  EuiBreadcrumbs,
  EuiButton,
  EuiPageContent,
  EuiPageHeader,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
      color: 'primary',
      onClick: (e) => {
        e.preventDefault();
      },
      'data-test-subj': 'breadcrumbsAnimals',
    },
    {
      text: 'Reptiles',
    },
    {
      text: 'Boa constrictor',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Edit',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
  ];

  return (
    <EuiPageContent role={null}>
      <EuiBreadcrumbs
        breadcrumbs={breadcrumbs}
        truncate={false}
        aria-label="An example of EuiBreadcrumbs"
      />
      <EuiSpacer size="xs" />
      <EuiPageHeader
        role=""
        pageTitle="Boa constrictor"
        rightSideItems={[<EuiButton>Cancel</EuiButton>]}
      />
    </EuiPageContent>
  );
};
