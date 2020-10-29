import React from 'react';

import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiPanel>
        <EuiText>
          <p>
            I am some panel content...
            <br /> ... <br /> ... <br />
            whose content is tall
          </p>
        </EuiText>
      </EuiPanel>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiPanel grow={true}>
        <EuiText>
          <p>I am some panel content... whose content will grow</p>
        </EuiText>
      </EuiPanel>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiPanel grow={false}>
        <EuiText>
          <p>I am some panel content... whose content did not grow</p>
        </EuiText>
      </EuiPanel>
    </EuiFlexItem>
  </EuiFlexGroup>
);
