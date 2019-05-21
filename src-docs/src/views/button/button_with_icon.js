import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp">
          Primary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp">
          Primary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp"
          isDisabled>
          Disabled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
