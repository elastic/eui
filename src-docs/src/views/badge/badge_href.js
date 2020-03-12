import React from 'react';

import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup wrap responsive={false} gutterSize="xs">
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="#BADA55"
        href="/#/display/badge"
        onClickAriaLabel="Example of href badge"
        data-test-sub="testExample3">
        href on text within badge
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="#0000FF"
        href="/#/display/badge"
        target="blank"
        onClickAriaLabel="Example of href badge with target=blank"
        data-test-sub="testExample4">
        an anchor badge with target=blank
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="accent"
        iconType="bolt"
        iconSide="right"
        href="/#/display/badge"
        onClickAriaLabel="Example of href event for the badge"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the anchor"
        data-test-sub="testExample5">
        href on both text and icon within badge
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="secondary"
        isDisabled={true}
        href="/#/display/badge"
        onClickAriaLabel="Example of disabled badge"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example disabled anchor"
        data-test-sub="testExample5">
        disabled anchor badge
      </EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
