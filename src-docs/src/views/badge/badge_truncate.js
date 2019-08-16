import React from 'react';

import { EuiBadge, EuiPanel, EuiSpacer } from '../../../../src/components';

export default () => (
  <EuiPanel style={{ maxWidth: 200 }}>
    <EuiBadge>Badge with simple text being truncated</EuiBadge>

    <EuiSpacer size="s" />

    <EuiBadge iconType="clock">Badge with icon being truncated</EuiBadge>

    <EuiSpacer size="s" />

    <EuiBadge onClick={() => {}} onClickAriaLabel="Click this badge to...">
      Badge with onClick being truncated
    </EuiBadge>

    <EuiSpacer size="s" />

    <EuiBadge
      iconType="cross"
      iconSide="right"
      iconOnClick={() => {}}
      iconOnClickAriaLabel="Click this icon to...">
      Badge with iconOnClick being truncated
    </EuiBadge>

    <EuiSpacer size="s" />

    <EuiBadge
      iconType="cross"
      iconSide="right"
      onClick={() => {}}
      onClickAriaLabel="Click this badge to..."
      iconOnClick={() => {}}
      iconOnClickAriaLabel="Click this icon to...">
      Badge with both onClicks being truncated
    </EuiBadge>
  </EuiPanel>
);
