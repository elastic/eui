import React from 'react';

import { EuiBreadcrumbs } from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
    },
    {
      text:
        'Metazoans is a real mouthful, especially for creatures without mouths',
      href: '#',
      truncate: true,
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
      text:
        'Nebulosa subspecies is also a real mouthful, especially for creatures without mouths',
    },
  ];

  return (
    <EuiBreadcrumbs
      truncate={false}
      breadcrumbs={breadcrumbs}
      aria-label="An example of EuiBreadcrumbs without truncate prop"
    />
  );
};
