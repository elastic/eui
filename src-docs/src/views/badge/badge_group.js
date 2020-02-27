import React from 'react';

import {
  EuiBadge,
  EuiBadgeGroup,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => {
  return (
    <EuiBadgeGroup gutterSize="s">
      <EuiBadge>Badge with simple text in a group</EuiBadge>

      <EuiBadge iconType="clock">Badge with icon in a group</EuiBadge>

      <EuiBadge onClick={() => {}} onClickAriaLabel="Click this badge to...">
        Badge with onClick in a group
      </EuiBadge>

      <EuiBadge
        iconType="cross"
        iconSide="right"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with iconOnClick in a group with a very long title to test if the
        badge will properly get truncated
      </EuiBadge>

      <EuiBadge
        iconType="cross"
        iconSide="right"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with both onClicks in a group
      </EuiBadge>

      <EuiButtonEmpty size="xs">And a button</EuiButtonEmpty>
    </EuiBadgeGroup>
  );
};
