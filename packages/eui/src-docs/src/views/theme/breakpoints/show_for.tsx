import React from 'react';

import { EuiCode, EuiShowFor, EuiText } from '../../../../../src/components';

export default () => (
  <EuiText>
    <EuiShowFor sizes={'all'}>
      <p>
        Showing for <EuiCode>{'"all"'}</EuiCode> of the screen sizes
      </p>
    </EuiShowFor>
    <EuiShowFor sizes={['xs']}>
      <p>
        Showing for <EuiCode>xs</EuiCode> screens only
      </p>
    </EuiShowFor>
    <EuiShowFor sizes={['xs', 's']}>
      <p>
        Showing for <EuiCode>xs, s</EuiCode> screens
      </p>
    </EuiShowFor>
    <EuiShowFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Showing for <EuiCode>xs, s, m, l</EuiCode> screens
      </p>
    </EuiShowFor>
    <EuiShowFor sizes={['xl']}>
      <p>
        Showing for <EuiCode>xl</EuiCode> screen only
      </p>
    </EuiShowFor>
    <EuiShowFor sizes={['m', 'l', 'xl']}>
      <p>
        Showing for <EuiCode>m, l, xl</EuiCode> screen only
      </p>
    </EuiShowFor>
  </EuiText>
);
