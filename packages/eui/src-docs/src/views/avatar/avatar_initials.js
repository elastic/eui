import React from 'react';

import {
  EuiAvatar,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
} from '../../../../src/components';

export default () => (
  <>
    <EuiTitle size="xs">
      <h3>Single vs multi-word</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiFlexGroup responsive={false} gutterSize="xs">
      <EuiAvatar name="Single" />
      <EuiAvatar name="Two Words" />
      <EuiAvatar name="More Than Two Words" />
      <EuiAvatar name="lower case" casing="lowercase" />
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiTitle size="xs">
      <h3>Custom</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiFlexGroup responsive={false} gutterSize="xs">
      <EuiAvatar name="Kibana" initialsLength={2} casing="capitalize" />
      <EuiAvatar name="Leonardo Dude" initialsLength={1} />
      <EuiAvatar name="Not provided" initials="?" />
      <EuiAvatar
        name="Engineering User"
        initials="En"
        casing="none"
        initialsLength={2}
      />
    </EuiFlexGroup>
  </>
);
