import React from 'react';

import {
  EuiBreadcrumbs,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

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
    <div>
      <EuiTitle size="xs">
        <span>Truncation on a single item</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiBreadcrumbs
        responsive={false}
        truncate={false}
        breadcrumbs={breadcrumbs}
      />
      <EuiSpacer />
      <EuiTitle size="xs">
        <span>Truncation on the entire set</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiBreadcrumbs
        responsive={false}
        truncate={true}
        breadcrumbs={breadcrumbs}
      />
    </div>
  );
};
