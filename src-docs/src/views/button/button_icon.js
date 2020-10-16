import React from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const colors = [
  'primary',
  'text',
  'accent',
  'subdued',
  'success',
  'warning',
  'danger',
];

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    {colors.map((color) => (
      <EuiFlexItem key={color} grow={false}>
        <EuiButtonIcon
          color={color}
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          aria-label="Next"
        />
      </EuiFlexItem>
    ))}
    <EuiFlexItem grow={false}>
      <EuiButtonIcon
        onClick={() => window.alert('Button clicked')}
        iconType="arrowRight"
        aria-label="Next"
        disabled
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
