import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center" wrap>
    <EuiFlexItem grow={false}>
      <EuiButton isLoading={true}>Loading&hellip;</EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButton fill isLoading={true}>
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
        Loading
      </EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty onClick={() => {}} isLoading iconSide="right">
        Loading
      </EuiButtonEmpty>
    </EuiFlexItem>
  </EuiFlexGroup>
);
