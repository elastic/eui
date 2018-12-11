import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="none">
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup gutterSize="xs">
      <EuiFlexItem>Extra small</EuiFlexItem>
      <EuiFlexItem>Extra small</EuiFlexItem>
      <EuiFlexItem>Extra small</EuiFlexItem>
      <EuiFlexItem>Extra small</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup gutterSize="m">
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup gutterSize="xl">
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
