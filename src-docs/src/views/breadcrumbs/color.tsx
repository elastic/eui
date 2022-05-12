import React from 'react';

import { EuiBreadcrumbs, EuiBreadcrumb, EuiIcon } from '../../../../src';

const breadcrumbs: EuiBreadcrumb[] = [
  {
    text: 'Animals',
    href: '#',
    color: 'primary',
    onClick: (e) => e.preventDefault(),
  },
  {
    text: 'Reptiles',
    color: 'primary',
  },
  {
    text: (
      <>
        <EuiIcon type="alert" size="s" /> Boa constrictor
      </>
    ),
    title: 'Boa constrictor has an error',
    href: '#',
    color: 'danger',
    onClick: (e) => e.preventDefault(),
  },
  {
    text: 'Edit',
  },
];

export default () => <EuiBreadcrumbs breadcrumbs={breadcrumbs} />;
