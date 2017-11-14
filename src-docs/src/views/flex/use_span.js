import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup useSpan>
    <EuiFlexItem useSpan>This a span within a span</EuiFlexItem>
    <EuiFlexItem useSpan>This a span within a span</EuiFlexItem>
  </EuiFlexGroup>
);
