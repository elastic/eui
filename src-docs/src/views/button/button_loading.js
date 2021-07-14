import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButton isLoading={true}>Loading&hellip;</EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButton fill size="s" isLoading={true}>
        Loading&hellip;
      </EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButton fill isLoading={true} iconType="check" iconSide="right">
        Loading&hellip;
      </EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty onClick={() => {}} isLoading>
        Loading&hellip;
      </EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty size="xs" onClick={() => {}} isLoading iconSide="right">
        Loading&hellip;
      </EuiButtonEmpty>
    </EuiFlexItem>
  </EuiFlexGroup>
);
