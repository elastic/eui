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
  '#fea27f',
  '#000'
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
