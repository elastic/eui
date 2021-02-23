import React from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

const colors = ['primary', 'text', 'accent', 'success', 'warning', 'danger'];

export default () => (
  <>
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
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
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon iconType="arrowRight" aria-label="Next" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon display={null} iconType="arrowRight" aria-label="Next" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon display="fill" iconType="arrowRight" aria-label="Next" />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="s" />
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon iconType="arrowRight" isDisabled aria-label="Next" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display={null}
          iconType="arrowRight"
          isDisabled
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          iconType="arrowRight"
          display="fill"
          isDisabled
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Size</h3>
    </EuiTitle>
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon display={null} iconType="arrowRight" aria-label="Next" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display={null}
          iconType="arrowRight"
          size="s"
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display={null}
          iconType="arrowRight"
          iconSize="l"
          size="m"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Split buttons</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton size="s" iconType="calendar" aria-label="Next">
          Last 15 min
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display={null}
          size="s"
          iconType="clock"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
