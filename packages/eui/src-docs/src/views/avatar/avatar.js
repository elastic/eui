import React from 'react';

import { EuiAvatar, EuiSpacer, EuiTitle } from '../../../../src/components';

export default () => (
  <div>
    <EuiAvatar size="s" name="Raphael" />
    &emsp;
    <EuiAvatar size="m" name="Donatello" />
    &emsp;
    <EuiAvatar size="l" name="Leonardo" color="#BD10E0" />
    &emsp;
    <EuiAvatar size="xl" name="Michelangelo" />
    <EuiSpacer />
    <EuiTitle size="xs">
      <h2>With image</h2>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar size="s" name="Cat" imageUrl="https://picsum.photos/id/40/64" />
    &emsp;
    <EuiAvatar size="m" name="Cat" imageUrl="https://picsum.photos/id/40/64" />
    &emsp;
    <EuiAvatar size="l" name="Cat" imageUrl="https://picsum.photos/id/40/64" />
    &emsp;
    <EuiAvatar size="xl" name="Cat" imageUrl="https://picsum.photos/id/40/64" />
  </div>
);
