import React from 'react';

import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs">
    <EuiFlexItem grow={false}>
      <EuiBadge color="#BADA55" href="/#/display/badge">
        badge as an anchor
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="hollow" href="/#/display/badge" target="blank">
        anchor with target specified
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="accent"
        href="/#/display/badge"
        iconType="bolt"
        iconSide="right"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the anchor">
        anchor with an icon and iconOnClick
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge color="secondary" href="/#/display/badge" isDisabled={true}>
        disabled anchor badge
      </EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
