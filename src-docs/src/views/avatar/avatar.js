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
    <EuiAvatar
      size="s"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <EuiAvatar
      size="m"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <EuiAvatar
      size="l"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
    />
    &emsp;
    <EuiAvatar
      size="xl"
      name="Cat"
      imageUrl="https://pbs.twimg.com/profile_images/378800000211028099/56f5de9fb1f42689f954afd2634efef8_400x400.jpeg"
    />
  </div>
);
