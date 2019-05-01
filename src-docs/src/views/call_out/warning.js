import React from 'react';

import { EuiCallOut, EuiLink, EuiButton } from '../../../../src/components';

export default () => (
  <EuiCallOut title="Proceed with caution!" color="warning" iconType="help">
    <p>
      Here be dragons. Don&rsquo;t wanna mess with no dragons. And{' '}
      <EuiLink href="#">here&rsquo;s a link</EuiLink>.
    </p>
    <EuiButton href="#" color="warning">
      Link button
    </EuiButton>
  </EuiCallOut>
);
