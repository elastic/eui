import React from 'react';

import {
  EuiStatusPill,
  EuiIcon,
  EuiText,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiStatusPill onClick={() => window.alert('Button clicked')}>
      Normal, no props
    </EuiStatusPill>
    <EuiStatusPill
      onClick={() => window.alert('Button clicked')}
      inactive
    >
      Inactive pop applied
    </EuiStatusPill>
    <EuiStatusPill
      status={<EuiIcon type="lock" />}
      onClick={() => window.alert('Button clicked')}
    >
      Icon passed in status prop
    </EuiStatusPill>
    <EuiStatusPill
      status={<EuiText color="danger" size="xs">Warning</EuiText>}
      onClick={() => window.alert('Button clicked')}
    >
      Text works as well
    </EuiStatusPill>
    <EuiStatusPill onClick={() => window.alert('Button clicked')}>
      Truncation applied on really long messages
    </EuiStatusPill>
  </div>
);
