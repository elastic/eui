import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => window.alert('Button clicked')}>
          Primary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton fill onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton size="s" onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton size="s" fill onClick={() => window.alert('Button clicked')}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          color="secondary"
          onClick={() => window.alert('Button clicked')}>
          Secondary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="secondary"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="secondary"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="secondary"
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
          color="warning"
          onClick={() => window.alert('Button clicked')}>
          Warning
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="warning"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="warning"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="warning"
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
          color="danger"
          onClick={() => window.alert('Button clicked')}>
          Danger
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton isDisabled onClick={() => window.alert('Button clicked')}>
          Disabled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          isDisabled
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          isDisabled
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          isDisabled
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
