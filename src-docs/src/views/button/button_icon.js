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
];

export default () => (
  <EuiFlexGroup gutterSize="s" alignItems="center">
    {colors.map(color => (
      <EuiFlexItem key={color} grow={false}>
        <EuiButtonIcon
          color={color}
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          aria-label="Next"
          disabled={color === 'disabled' ? true : false}
        />
      </EuiFlexItem>
    ))}
  </EuiFlexGroup>
);
