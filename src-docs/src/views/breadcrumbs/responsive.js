import React from 'react';

import {
  EuiBreadcrumbs,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
    },
    {
      text: 'Metazoans',
      href: '#',
    },
    {
      text: 'Chordates',
      href: '#',
    },
    {
      text: 'Vertebrates',
      href: '#',
    },
    {
      text: 'Tetrapods',
      href: '#',
    },
    {
      text: 'Reptiles',
      href: '#',
    },
    {
      text: 'Boa constrictor',
      href: '#',
    },
    {
      text: 'Nebulosa subspecies',
    },
  ];

  return (
    <>
      <EuiTitle size="xs">
        <span>Turning responsive completely off</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiBreadcrumbs
        responsive={false}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of non-responsive EuiBreadcrumbs"
      />
      <EuiSpacer />
      <EuiTitle size="xs">
        <span>Customizing number of items to display</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiBreadcrumbs
        responsive={{
          xs: 1,
          s: 3,
          m: 5,
          xl: 6,
        }}
        breadcrumbs={breadcrumbs}
        max={null}
        aria-label="An example of custom responsive EuiBreadcrumbs"
      />
    </>
  );
};
