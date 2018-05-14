import React from 'react';

import {
  EuiBreadcrumbs,
} from '../../../../src/components';

export default () => {
  const breadcrumbs = [{
    text: 'Animals',
    href: '#',
  }, {
    text: 'Metazoans is a real mouthful, especially for creatures without mouths',
    href: '#',
  }, {
    text: 'Nebulosa subspecies',
  }];

  return <EuiBreadcrumbs breadcrumbs={breadcrumbs} />;
};
