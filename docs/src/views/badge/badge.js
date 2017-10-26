import React from 'react';

import {
  EuiBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge color="default">
      Default
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="primary">
      Primary
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="secondary">
      Secondary
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="accent">
      Accent
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="warning">
      Warning
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge color="danger">
      Danger
    </EuiBadge>
  </div>

);
