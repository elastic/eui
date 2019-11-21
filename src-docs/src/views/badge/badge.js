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
  '#000',
  '#fea27f',
];

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs" style={{ width: 300 }}>
    {badges.map(badge => (
      <EuiFlexItem grow={false} key={badge}>
        <EuiBadge color={badge}>{badge}</EuiBadge>
      </EuiFlexItem>
    ))}
    <EuiFlexItem grow={false}>
      <EuiBadge isDisabled={true}>disabled</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
