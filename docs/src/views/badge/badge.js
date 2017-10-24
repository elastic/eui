import React from 'react';

import {
  EuiBadge,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBadge type="default">
      Default
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge type="primary">
      Primary
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge type="secondary">
      Secondary
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge type="accent">
      Accent
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge type="warning">
      Warning
    </EuiBadge>

    &nbsp;&nbsp;

    <EuiBadge type="danger">
      Danger
    </EuiBadge>
  </div>

);
