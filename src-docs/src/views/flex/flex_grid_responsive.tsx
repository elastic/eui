import React from 'react';
import {
  EuiFlexGrid,
  EuiFlexItem,
  useIsWithinBreakpoints,
} from '../../../../src';

export default () => {
  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  return (
    <EuiFlexGrid responsive={false} columns={isMobile ? 2 : 4}>
      <EuiFlexItem>One</EuiFlexItem>
      <EuiFlexItem>Two</EuiFlexItem>
      <EuiFlexItem>Three</EuiFlexItem>
      <EuiFlexItem>Four</EuiFlexItem>
      <EuiFlexItem>Five</EuiFlexItem>
      <EuiFlexItem>Six</EuiFlexItem>
    </EuiFlexGrid>
  );
};
