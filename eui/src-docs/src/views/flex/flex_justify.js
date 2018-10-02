import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup justifyContent="spaceEvenly">
      <EuiFlexItem grow={false}>One here on the left</EuiFlexItem>
      <EuiFlexItem grow={false}>The other over here on the right.</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup justifyContent="spaceBetween">
      <EuiFlexItem grow={false}>One here on the left</EuiFlexItem>
      <EuiFlexItem grow={false}>The other over here on the right.</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem grow={false}>I&rsquo;m a single centered item!</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiText>
          <p>I</p>
          <p>am</p>
          <p>really</p>
          <p>tall</p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>I am vertically centered!</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
