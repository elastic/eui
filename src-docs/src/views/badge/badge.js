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
    {badges.map(badge => {
      const isDisabled = badge === '0000FF';
      return (
        <EuiFlexItem grow={false} key={badge}>
          <EuiBadge
            isDisabled={isDisabled ? true : false}
            color={isDisabled ? undefined : badge}>
            {isDisabled ? 'disabled' : badge}
          </EuiBadge>
        </EuiFlexItem>
      );
    })}
  </EuiFlexGroup>
);
