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
  '0000FF',
];

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs" style={{ width: 300 }}>
    {badges.map(badge => (
      <EuiFlexItem grow={false} key={badge}>
        <EuiBadge isDisabled={badge === '0000FF' ? true : false} color={badge}>
          {badge === '0000FF' ? 'disabled' : badge}
        </EuiBadge>
      </EuiFlexItem>
    ))}
  </EuiFlexGroup>
);
