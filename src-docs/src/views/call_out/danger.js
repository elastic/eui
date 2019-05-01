import React from 'react';

import { EuiCallOut, EuiLink } from '../../../../src/components';

export default () => (
  <EuiCallOut title="Sorry, there was an error" color="danger" iconType="cross">
    <p>
      Now you have to fix it, but maybe{' '}
      <EuiLink href="#">this link can help</EuiLink>.
    </p>
  </EuiCallOut>
);
