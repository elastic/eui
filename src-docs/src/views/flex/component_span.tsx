import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <button>
    <EuiFlexGroup component="span">
      <EuiFlexItem component="span">
        These items are within a button
      </EuiFlexItem>

      <EuiFlexItem component="span">
        So they all specify component=&ldquo;span&rdquo;
      </EuiFlexItem>
    </EuiFlexGroup>
  </button>
);
