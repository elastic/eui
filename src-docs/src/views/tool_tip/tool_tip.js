import React from 'react';

import {
  EuiToolTip,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <div style={{ overflow: 'hidden' }}>
    <p>
      Look a fancy{' '}
      <EuiToolTip text="Here is some tooltip text">
        <EuiLink>tooltip</EuiLink>
      </EuiToolTip>.
    </p>
  </div>
);
