import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false}><EuiIcon type="faceSad" /></EuiFlexItem>
      <EuiFlexItem grow={false}>On mobile, the icon will show above this text.</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup responsive={false} alignItems="center">
      <EuiFlexItem grow={false}><EuiIcon type="faceHappy" /></EuiFlexItem>
      <EuiFlexItem grow={false}>On mobile, the icon will stay to the left of this text.</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
