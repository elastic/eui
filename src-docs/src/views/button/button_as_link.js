import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiButton href="http://www.elastic.co">
        Link to elastic.co
      </EuiButton>
    </EuiFlexItem>

    <EuiFlexItem grow={false}>
      <EuiButtonEmpty href="http://www.elastic.co">
        Link to elastic.co
      </EuiButtonEmpty>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiButtonIcon href="http://www.elastic.co" iconType="link" aria-label="This is a link" />
    </EuiFlexItem>
  </EuiFlexGroup>
);
