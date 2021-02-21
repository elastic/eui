import React from 'react';

import { EuiAvatar, EuiTitle, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="xs">
      <h3>Single vs multi-word</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar size="m" name="Single" />
    &emsp;
    <EuiAvatar size="m" name="Two Words" />
    &emsp;
    <EuiAvatar size="m" name="More Than Two Words" />
    &emsp;
    <EuiAvatar size="m" name="lowercase words" />
    <EuiSpacer />
    <EuiTitle size="xs">
      <h4>Custom &amp; Spaces type</h4>
    </EuiTitle>
    <EuiSpacer />
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
