import React from 'react';

import { EuiAvatar } from '../../../../src/components';

export default () => (
  <div>
    <EuiAvatar
      size="m"
      type="space"
      name="Disabled"
      initials="Di"
      initialsLength={2}
      isDisabled={true}
    />
    &emsp;
    <EuiAvatar
      size="m"
      type="user"
      name="User"
      initials="En"
      initialsLength={2}
      isDisabled={true}
    />
    &emsp;
    <EuiAvatar
      size="m"
      name="Cat"
      imageUrl="https://source.unsplash.com/64x64/?cat"
      isDisabled={true}
    />
    &emsp;
    <EuiAvatar
      size="m"
      name="Management"
      iconType="managementApp"
      isDisabled={true}
    />
  </div>
);
