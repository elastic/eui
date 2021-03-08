import React from 'react';

import { EuiAvatar, EuiTitle, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="xs">
      <h3>Spaces</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar size="s" type="space" name="Kibana" />
    &emsp;
    <EuiAvatar type="space" name="Leonardo Space" />
    &emsp;
    <EuiAvatar size="l" type="space" name="Default" />
    &emsp;
    <EuiAvatar size="xl" type="space" name="Engineering Space" />
  </div>
);
