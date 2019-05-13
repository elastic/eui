import React from 'react';

import { EuiCode, EuiHideFor, EuiShowFor } from '../../../../src/components';

export default () => (
  <div>
    <EuiHideFor sizes={['xs']}>
      Hiding from <EuiCode>xs</EuiCode> screens only
    </EuiHideFor>
    <br />
    <EuiHideFor sizes={['xs', 's']}>
      Hiding from <EuiCode>xs, s</EuiCode> screens
    </EuiHideFor>
    <br />
    <EuiHideFor sizes={['xs', 's', 'm', 'l']}>
      Hiding from <EuiCode>xs, s, m, l</EuiCode> screens
    </EuiHideFor>
    <br />
    <EuiHideFor sizes={['xl']}>
      Hiding from <EuiCode>xl</EuiCode> screens only
    </EuiHideFor>

    <br />
    <br />

    <EuiShowFor sizes={['xs']}>
      Showing for <EuiCode>xs</EuiCode> screens only
    </EuiShowFor>
    <br />
    <EuiShowFor sizes={['xs', 's']}>
      Showing for <EuiCode>xs, s</EuiCode> screens
    </EuiShowFor>
    <br />
    <EuiShowFor sizes={['xs', 's', 'm', 'l']}>
      Showing for <EuiCode>xs, s, m, l</EuiCode> screens
    </EuiShowFor>
    <br />
    <EuiShowFor sizes={['xl']}>
      Showing for <EuiCode>xl</EuiCode> screen only
    </EuiShowFor>
  </div>
);
