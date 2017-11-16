import React from 'react';

import {
  EuiBadge,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge color="secondary" iconType="check">
      OK
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="warning" iconType="minusInCircle">
      Warning
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="danger" iconType="alert">
      Danger
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="primary" iconType="faceHappy" iconSide="right">
      Right side
    </EuiBadge>

  </div>
);
