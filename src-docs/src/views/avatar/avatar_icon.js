import React from 'react';

import { EuiAvatar, EuiSpacer, EuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="xs">
      <h2>Avatar colors and sizes</h2>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar size="s" name="Management" iconType="managementApp" />
    &emsp;
    <EuiAvatar size="m" name="Management app" iconType="managementApp" />
    &emsp;
    <EuiAvatar
      size="l"
      name="Management application"
      iconType="managementApp"
    />
    &emsp;
    <EuiAvatar size="xl" name="Manage" iconType="managementApp" />
    <EuiSpacer />
    <EuiTitle size="xs">
      <h2>Icon colors and sizes</h2>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar name="Avatar color" iconType="managementApp" color="#BD10E0" />
    &emsp;
    <EuiAvatar
      name="Custom iconColor"
      iconType="managementApp"
      color="#e6f1fa"
      iconColor="primary"
    />
    &emsp;
    <EuiAvatar
      name="Null iconColor"
      iconType="managementApp"
      color="#FAFBFD"
      iconColor={null}
    />
    &emsp;
    <EuiAvatar name="Large iconSize" iconType="managementApp" iconSize="l" />
    &emsp;
  </div>
);
