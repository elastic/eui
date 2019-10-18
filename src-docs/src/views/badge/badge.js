import React, { Fragment } from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
];

const customBadges = [
  '#AAA',
  '#DDD',
  '#999',
  '#666',
  '#333',
  '#000',
  '#BADA55',
  '#FCF7BC',
  '#FEA27F',
  '#FFA500',
  '#0000FF',
];

export default () => (
  <Fragment>
    <EuiTitle size="xxs">
      <h3>EUI colors</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup
      wrap
      responsive={false}
      gutterSize="xs"
      style={{ width: 300 }}>
      {badges.map(badge => (
        <EuiFlexItem grow={false} key={badge}>
          <EuiBadge color={badge}>{badge}</EuiBadge>
        </EuiFlexItem>
      ))}
      <EuiFlexItem grow={false}>
        <EuiBadge isDisabled={true}>disabled</EuiBadge>
      </EuiFlexItem>
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiTitle size="xxs">
      <h3>Custom HEX colors</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup
      wrap
      responsive={false}
      gutterSize="xs"
      style={{ width: 300 }}>
      {customBadges.map(badge => (
        <EuiFlexItem grow={false} key={badge}>
          <EuiBadge color={badge}>{badge}</EuiBadge>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  </Fragment>
);
