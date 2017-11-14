import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem>Content grid item</EuiFlexItem>
    <EuiFlexItem>
      <p>Another content grid item</p>
      <EuiSpacer />
      <p>Note how both of these are the same width and height despite having different content?</p>
    </EuiFlexItem>
  </EuiFlexGroup>
);
