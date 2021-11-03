import React from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiCode,
} from '../../../../src/components';

const colors = ['primary', 'success', 'warning', 'danger', 'text', 'accent'];

export default () => (
  <>
    <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
      {colors.map((color) => (
        <EuiFlexItem key={color} grow={false}>
          <EuiButtonIcon
            color={color}
            onClick={() => {}}
            iconType="help"
            aria-label="Help"
          />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>
        Display (<EuiCode>empty</EuiCode>, <EuiCode>base</EuiCode>,{' '}
        <EuiCode>fill</EuiCode>)
      </h3>
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
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>Disabled </h3>
    </EuiTitle>
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
          disabled
          aria-label="Next"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer size="m" />
    <EuiTitle size="xxs">
      <h3>
        Size (<EuiCode>xs</EuiCode>, <EuiCode>s</EuiCode>, <EuiCode>m</EuiCode>)
      </h3>
    </EuiTitle>
    <EuiSpacer size="s" />
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
      <h3>All icons types inherit button color</h3>
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
