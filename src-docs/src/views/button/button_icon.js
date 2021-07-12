import React from 'react';

import {
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
        <EuiButtonIcon display="base" iconType="arrowRight" aria-label="Next" />
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
          display="base"
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
        <EuiButtonIcon display="base" iconType="arrowRight" aria-label="Next" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          iconType="arrowRight"
          size="s"
          aria-label="Next"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          iconType="arrowRight"
          iconSize="l"
          size="m"
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Icons inherit by default the button color</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon iconType="heart" aria-label="Heart" color="accent" />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          iconType="dashboardApp"
          aria-label="Dashboard"
          color="success"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          display="base"
          iconType="trash"
          aria-label="Delete"
          color="danger"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon display="base" iconType="lensApp" aria-label="Lens" />
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
