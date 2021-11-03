import React, { Fragment, useState } from 'react';

import {
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
];

const customBadges = [
  '#DDD',
  '#AAA',
  '#666',
  '#333',
  '#BADA55',
  '#FCF7BC',
  '#FEA27F',
  '#FFA500',
  '#0000FF',
];

export default () => {
  const [isDisabled, setDisabled] = useState(false);

  return (
    <Fragment>
      <EuiTitle size="xs">
        <h2>Accepted color names</h2>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiFlexGroup wrap responsive={false} gutterSize="xs">
        {badges.map((badge) => (
          <EuiFlexItem grow={false} key={badge}>
            <EuiBadge color={badge}>{badge}</EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size="xs">
        <h3>Custom color examples</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiFlexGroup
        wrap
        responsive={false}
        gutterSize="xs"
        style={{ maxWidth: '300px' }}
      >
        {customBadges.map((badge) => (
          <EuiFlexItem grow={false} key={badge}>
            <EuiBadge color={badge}>{badge}</EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size="xs">
        <h3>Disabled state</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiText size="s">
        Regardless of the assigned color, all badges use the same disabled state
        styles.
      </EuiText>
      <EuiSpacer size="m" />
      <EuiSwitch
        label="Show disabled state"
        checked={isDisabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <EuiSpacer size="m" />
      <EuiFlexGroup wrap responsive={false} gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiBadge color="success" isDisabled={isDisabled}>
            {isDisabled ? 'Disabled badge' : 'Disable me!'}
          </EuiBadge>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
