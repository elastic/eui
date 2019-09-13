import React, { Fragment } from 'react';

import {
  EuiBreadcrumbs,
  EuiButton,
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
      onClick: e => {
        e.preventDefault();
        console.log('You clicked Animals');
      },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass',
    },
    {
      text: 'Reptiles',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked Reptiles');
      },
    },
    {
      text: 'Boa constrictor',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked Boa constrictor');
      },
    },
    {
      text: 'Edit',
    },
  ];

  return (
    <Fragment>
      <EuiBreadcrumbs breadcrumbs={breadcrumbs} truncate={false} />
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
    </Fragment>
  );
};
