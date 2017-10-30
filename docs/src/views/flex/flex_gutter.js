import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="none">
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
      <EuiFlexItem>None</EuiFlexItem>
    </EuiFlexGroup>

    <br/>
    <br/>

    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
      <EuiFlexItem>Small</EuiFlexItem>
    </EuiFlexGroup>

    <br/>
    <br/>

    <EuiFlexGroup gutterSize="m">
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
      <EuiFlexItem>Medium</EuiFlexItem>
    </EuiFlexGroup>

    <br/>
    <br/>

    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
      <EuiFlexItem>Large (default)</EuiFlexItem>
    </EuiFlexGroup>

    <br/>
    <br/>

    <EuiFlexGroup gutterSize="xl">
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
      <EuiFlexItem>Extra Large</EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
