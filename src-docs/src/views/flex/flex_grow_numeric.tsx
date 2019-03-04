import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem grow={1}>1</EuiFlexItem>
      <EuiFlexItem grow={2}>
        2<br />
        wraps content if necessary
      </EuiFlexItem>
      <EuiFlexItem grow={3}>
        3<br />
        expands_to_fit_if_content_cannot_wrap
      </EuiFlexItem>
      <EuiFlexItem grow={4}>4</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup>
      <EuiFlexItem grow={6}>6</EuiFlexItem>
      <EuiFlexItem grow={3}>3</EuiFlexItem>
      <EuiFlexItem grow={1}>1</EuiFlexItem>
      <EuiFlexItem grow={3}>3</EuiFlexItem>
      <EuiFlexItem grow={6}>6</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
