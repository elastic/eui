import React from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <EuiFlexGroup wrap={true} gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButtonEmpty onClick={() => {}}> Empty button </EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty size="s" onClick={() => {}}>
        Small empty button
      </EuiButtonEmpty>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty size="xs" onClick={() => {}}>
        Extra small empty button
      </EuiButtonEmpty>
    </EuiFlexItem>
  </EuiFlexGroup>
);
