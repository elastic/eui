import React, { Fragment } from 'react';

import {
  EuiBreadcrumbs,
  EuiShowFor,
  EuiText,
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
    <Fragment>
      <EuiBreadcrumbs responsive={false} breadcrumbs={breadcrumbs} max={null} />

      <EuiShowFor sizes={['xs', 's']}>
        <EuiText size="s" color="subdued">
          <p>
            <em>Only the last item will show on small (mobile) screens.</em>
          </p>
        </EuiText>
      </EuiShowFor>
    </Fragment>
  );
};
