import React, { Fragment } from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiSpacer,
  EuiBadgeGroup,
  EuiTitle,
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
      <EuiTitle size="xs">
        <h3>Badge Group</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiBadgeGroup wrap responsive={false} gutterSize="xs">
        {badges.map(badge => (
          <EuiFlexItem grow={false} key={badge}>
            <EuiBadge color={badge}>{badge}</EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiBadgeGroup>
      <EuiSpacer />
    </Fragment>
  );
};
