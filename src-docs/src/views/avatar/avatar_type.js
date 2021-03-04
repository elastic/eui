import React from 'react';

import { EuiAvatar } from '../../../../src/components';

export default () => (
  <div>
    <EuiAvatar size="m" type="space" name="Kibana" initialsLength={2} />
    &emsp;
    <EuiAvatar size="m" type="space" name="Leonardo Dude" initialsLength={1} />
    &emsp;
    <EuiAvatar size="m" type="space" name="Not provided" initials="?" />
    &emsp;
    <EuiAvatar
      size="m"
      type="space"
      name="Engineering Space"
      initials="En"
      initialsLength={2}
    />
  </div>
);
