import React from 'react';

import { EuiCallOut, EuiLink } from '../../../../src/components';

export default () => (
  <EuiCallOut title="Good news, everyone!" color="success" iconType="user">
    <p>
      I have no news. Which is good! And{' '}
      <EuiLink href="#">here&rsquo;s a link</EuiLink>.
    </p>
  </EuiCallOut>
);
