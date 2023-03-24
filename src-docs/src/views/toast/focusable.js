import React from 'react';

import { EuiButton, EuiToast } from '../../../../src/components';

export default () => (
  <EuiToast title="Focusable toast" color="warning" isAutoFocused>
    <>
      <p>This is a security measure.</p>
      <p>
        Please click the button below or move your mouse to show that
        you&rsquo;re still using Kibana.
      </p>
      <EuiButton>Extend my session</EuiButton>
    </>
  </EuiToast>
);
