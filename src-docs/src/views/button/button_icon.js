import React from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
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
  <>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      {colors.map((color) => (
        <EuiFlexItem key={color} grow={false}>
          <EuiButtonIcon
            color={color}
            onClick={() => {}}
            iconType="arrowRight"
            aria-label="Next"
          />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          display="fill"
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          display="default"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          isDisabled={true}
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          display="fill"
          isDisabled={true}
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          display="default"
          isDisabled={true}
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
