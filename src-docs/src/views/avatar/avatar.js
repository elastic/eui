import React from 'react';

import {
  EuiAvatar,
  EuiSpacer,
  EuiTitle,
  EuiAvatarGroup,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiAvatar size="s" name="Raphael"/>
    &emsp;
    <EuiAvatar size="m" name="Donatello" />
    &emsp;
    <EuiAvatar size="l" name="Leonardo" color="#BD10E0" />
    &emsp;
    <EuiAvatar size="xl" name="Michelangelo" />

    <EuiSpacer />
    <EuiTitle size="xs"><h3>With image</h3></EuiTitle>
    <EuiSpacer />

    <EuiAvatar size="s" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
    &emsp;
    <EuiAvatar size="m" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
    &emsp;
    <EuiAvatar size="l"  name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
    &emsp;
    <EuiAvatar size="xl" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />


    <EuiAvatarGroup
      avatars={[
        <EuiAvatar key="1" name="Rafael"/>,
        <EuiAvatar key="2" name="Donatello" />,
        <EuiAvatar key="3" name="Leornardo" color="#BD10E0" />,
        <EuiAvatar key="4" name="Michaelangelo" />
      ]}
    />
  </div>
);
