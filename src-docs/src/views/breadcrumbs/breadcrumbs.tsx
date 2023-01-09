import React from 'react';

import {
  EuiBreadcrumb,
  EuiBreadcrumbs,
  EuiButton,
  EuiPanel,
  EuiPageHeader,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs: EuiBreadcrumb[] = [
    {
      text: 'Animals',
      href: '#',
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
    <EuiPanel>
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
    </EuiPanel>
  );
};
