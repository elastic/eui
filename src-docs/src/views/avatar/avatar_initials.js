import React from 'react';

import { EuiAvatar, EuiTitle, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="xs">
      <h3>Single vs multi-word</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar name="Single" />
    &emsp;
    <EuiAvatar name="Two Words" />
    &emsp;
    <EuiAvatar name="More Than Two Words" />
    &emsp;
    <EuiAvatar name="lowercase words" />
    <EuiSpacer />
    <EuiTitle size="xs">
      <h4>Custom</h4>
    </EuiTitle>
    <EuiSpacer />
    <EuiAvatar name="Kibana" initialsLength={2} />
    &emsp;
    <EuiAvatar name="Leonardo Dude" initialsLength={1} />
    &emsp;
    <EuiAvatar name="Not provided" initials="?" />
    &emsp;
    <EuiAvatar name="Engineering User" initials="En" initialsLength={2} />
  </div>
);
