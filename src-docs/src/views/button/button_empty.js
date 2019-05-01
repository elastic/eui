import React from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => window.alert('Button clicked')}>
          Primary
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty size="s" onClick={() => window.alert('Button clicked')}>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Primary
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Primary
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}>
          Danger
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Danger
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Danger
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}>
          Text
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Text
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Text
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          Disabled
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="xs"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          extra small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          isLoading>
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          isLoading
          iconSide="right">
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          isDisabled>
          Disabled
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          isDisabled>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right"
          isDisabled>
          Disabled
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right"
          isDisabled>
          small
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
