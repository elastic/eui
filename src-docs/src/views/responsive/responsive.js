import React from 'react';

import {
  EuiCode,
  EuiHideFor,
  EuiShowFor,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <EuiHideFor sizes={['xs']}>
      <p>
        Hiding from <EuiCode>xs</EuiCode> screens only
      </p>
    </EuiHideFor>
    <EuiHideFor sizes={['xs', 's']}>
      <p>
        Hiding from <EuiCode>xs, s</EuiCode> screens
      </p>
    </EuiHideFor>
    <EuiHideFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Hiding from <EuiCode>xs, s, m, l</EuiCode> screens
      </p>
    </EuiHideFor>
    <EuiHideFor sizes={['xl']}>
      <p>
        Hiding from <EuiCode>xl</EuiCode> screens only
      </p>
    </EuiHideFor>

    <EuiSpacer size="xxl" />

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
