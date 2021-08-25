import React from 'react';

import { EuiBreadcrumbs } from '../../../../src/components';

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
  );
};
