import React from 'react';

import {
  EuiCode,
  EuiHideFrom,
  EuiShowFor,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiHideFrom sizes={['xs']}>
      Hiding from <EuiCode>xs</EuiCode> screens only
    </EuiHideFrom>
    <br/>
    <EuiHideFrom sizes={['xs','s']}>
      Hiding from <EuiCode>xs, s</EuiCode> screens
    </EuiHideFrom>
    <br/>
    <EuiHideFrom sizes={['xs','s','m', 'l']}>
      Hiding from <EuiCode>xs, s, m, l</EuiCode> screens
    </EuiHideFrom>
    <br/>
    <EuiHideFrom sizes={['xl']}>
      Hiding from <EuiCode>xl</EuiCode> screens only
    </EuiHideFrom>

    <br/>
    <br/>

    <EuiShowFor sizes={['xs']}>
      Showing for <EuiCode>xs</EuiCode> screens only
    </EuiShowFor>
    <br/>
    <EuiShowFor sizes={['xs','s']}>
      Showing for <EuiCode>xs, s</EuiCode> screens
    </EuiShowFor>
    <br/>
    <EuiShowFor sizes={['xs','s','m', 'l']}>
      Showing for <EuiCode>xs, s, m, l</EuiCode> screens
    </EuiShowFor>
    <br/>
    <EuiShowFor sizes={['xl']}>
      Showing for <EuiCode>xl</EuiCode> screen only
    </EuiShowFor>
  </div>
);
