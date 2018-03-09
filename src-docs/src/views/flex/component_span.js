import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <button onClick={() => { window.alert('click'); }}>
    <EuiFlexGroup>
      <EuiFlexItem>
        <span>
          These items are within a button
        </span>
      </EuiFlexItem>

      <EuiFlexItem>
        <span>
          So they are both wrapped in &lt;span&gt; elements
        </span>
      </EuiFlexItem>
    </EuiFlexGroup>
  </button>
);
