import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center" className="guideDemo__ghostBackground">
    <EuiFlexItem grow={false}>
      <EuiButton
        color="ghost"
        onClick={() => window.alert('Button clicked')}
      >
        Primary
      </EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButton
        fill
        color="ghost"
        size="s"
        iconType="check"
        onClick={() => window.alert('Button clicked')}
      >
        Filled
      </EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty
        size="s"
        color="ghost"
        onClick={() => window.alert('Button clicked')}
      >
        small
      </EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        size="s"
        color="ghost"
        iconType="user"
        onClick={() => window.alert('Button clicked')}
        aria-label="Your account"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
