import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <button onClick={() => { window.alert('click'); }}>
    <EuiFlexGroup useSpan>
      <EuiFlexItem useSpan>
        These items are within a button
      </EuiFlexItem>

      <EuiFlexItem useSpan>
        So they all have useSpan
      </EuiFlexItem>
    </EuiFlexGroup>
  </button>
);
