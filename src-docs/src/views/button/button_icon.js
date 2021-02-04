import React from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
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
    <EuiTitle size="xxs">
      <h3>Display</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
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
          display
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          display="fill"
          iconType="arrowRight"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="s" />
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
          display
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
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Size</h3>
    </EuiTitle>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          display
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          size="s"
          display
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          iconSize="l"
          size="m"
          display
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Split buttons</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          size="s"
          iconType="calendar"
          onClick={() => window.alert('Button clicked')}
          aria-label="Next">
          Last 15 min
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="clock"
          display="default"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
