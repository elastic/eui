import React from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        onClick={() => window.alert('Button clicked')}
        iconType="arrowRight"
        aria-label="Next"
      />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        size="s"
        color="danger"
        onClick={() => window.alert('Button clicked')}
        iconType="arrowRight"
        aria-label="Next"
      />
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        size="s"
        color="disabled"
        onClick={() => window.alert('Button clicked')}
        iconType="arrowRight"
        aria-label="Next"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);

