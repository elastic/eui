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
        color="primary"
        onClick={() => {}}
        onClickAriaLabel="Example of onClick event for the button"
        data-test-sub="testExample1"
      >
        onClick on text within badge
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="hollow"
        iconType="cross"
        iconSide="right"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample2"
      >
        onClick on icon within badge
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        color="success"
        iconType="cross"
        iconSide="right"
        onClick={() => {}}
        onClickAriaLabel="Example of onClick event for the button"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample3"
      >
        onClick on both text and icon within badge
      </EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge
        isDisabled={true}
        color="danger"
        onClick={() => {}}
        onClickAriaLabel="Example of disabled button badge"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of disabled button badge"
        data-test-sub="testExample4"
      >
        disabled button badge
      </EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);
