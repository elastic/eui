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
    <EuiHideFrom sizes={['xs','s','m']}>
      Hiding from <EuiCode>xs, s, m</EuiCode> screens
    </EuiHideFrom>
    <br/>
    <EuiHideFrom sizes={['l']}>
      Hiding from <EuiCode>l</EuiCode> screens only
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
    <EuiShowFor sizes={['xs','s','m']}>
      Showing for <EuiCode>xs, s, m</EuiCode> screens
    </EuiShowFor>
    <br/>
    <EuiShowFor sizes={['l']}>
      Showing for <EuiCode>l</EuiCode> screen only
    </EuiShowFor>
  </div>
);
