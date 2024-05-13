import React from 'react';

import { EuiCode, EuiHideFor, EuiText } from '../../../../../src/components';

export default () => (
  <EuiText>
    <EuiHideFor sizes={'none'}>
      <p>
        Hiding from <EuiCode>{'"none"'}</EuiCode> of the screen sizes
      </p>
    </EuiHideFor>
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
  </EuiText>
);
