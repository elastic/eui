import React from 'react';

import {
  EuiBreadcrumbs,
  EuiButton,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
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
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle size="l">
            <h1>Boa constrictor</h1>
          </EuiTitle>
        </EuiPageContentHeaderSection>

        <EuiPageContentHeaderSection>
          <EuiButton>Cancel</EuiButton>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
    </EuiPageContent>
  );
};
