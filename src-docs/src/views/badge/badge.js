import React from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src/components';

const badges = [
  'default',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
  // 'vis0',
  // 'vis1',
  // 'vis2',
  // 'vis3',
  // 'vis4',
  // 'vis5',
  // 'vis6',
  // 'vis7',
  // 'vis8',
  // 'vis9',
];

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs">
    {
      badges.map(badge => (
        <EuiFlexItem grow={false}>
          <EuiBadge color={badge} key={badge}>
            {badge}
          </EuiBadge>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGroup>

);
