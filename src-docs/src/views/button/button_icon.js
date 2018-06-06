import React from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const colors = [
  'primary',
  'text',
  'subdued',
  'success',
  'warning',
  'danger',
  'disabled',
  'ghost',
];

const ghostBackgroundStyle = {
  background: '#000',
  borderRadius: '4px',
}

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    {
      colors.map(color => (
        <EuiFlexItem grow={false} style={color === "ghost" ? ghostBackgroundStyle : null}>
          <EuiButtonIcon
            size="s"
            color={color}
            onClick={() => window.alert('Button clicked')}
            iconType="arrowRight"
            aria-label="Next"
            disabled={color === "disabled" ? true : false}
          />
        </EuiFlexItem>
      ))
    }
  </EuiFlexGroup>
);
