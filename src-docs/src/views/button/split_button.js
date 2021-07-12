import React from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const colors = ['primary', 'text', 'accent', 'success', 'warning', 'danger'];

export default () => (
  <>
    {colors.map((color) => (
      <EuiFlexGroup
        key={color}
        responsive={false}
        gutterSize="s"
        alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton color={color} size="s" iconType="calendar">
            Last 15 min
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            color={color}
            display="base"
            size="s"
            iconType="boxesVertical"
            aria-label="More"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    ))}
  </>
);
