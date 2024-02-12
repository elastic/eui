import React from 'react';

import { EuiCallOut, EuiLink, EuiButton } from '../../../../src';

export default () => (
  <EuiCallOut title="Proceed with caution!" color="warning" iconType="warning">
    <p>
      Here be dragons. Don&rsquo;t wanna mess with no dragons. And{' '}
      <EuiLink href="#">here&rsquo;s a link</EuiLink>.
    </p>
    <EuiButton href="#" color="warning">
      Link button
    </EuiButton>
  </EuiCallOut>
);
