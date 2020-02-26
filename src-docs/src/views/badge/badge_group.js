import React, { Fragment } from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiBadgeGroup,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
];

export default () => {
  return (
    <Fragment>
      <EuiBadgeGroup wrap responsive={false} gutterSize="xs">
        {badges.map(badge => (
          <EuiFlexItem grow={false} key={badge}>
            <EuiBadge color={badge}>{badge}</EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiBadgeGroup>
    </Fragment>
  );
};
