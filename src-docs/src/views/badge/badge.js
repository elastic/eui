import React from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
  '#fea27f',
  '#000',
];

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs" style={{ width: 300 }}>
    {badges.map(badge => (
      <EuiFlexItem grow={false} key={badge}>
        <EuiBadge color={badge}>{badge}</EuiBadge>
      </EuiFlexItem>
    ))}
  </EuiFlexGroup>
);
