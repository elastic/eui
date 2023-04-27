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
      <EuiAvatar name="lower_case_single" />
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiTitle size="xs">
      <h3>Letter casing</h3>
    </EuiTitle>
    <EuiSpacer />
    <EuiFlexGroup responsive={false} gutterSize="xs">
      <EuiAvatar name="capitalized - default" />
      <EuiAvatar name="upper case" casing="uppercase" />
      <EuiAvatar name="LOWER CASE" casing="lowercase" />
      <EuiAvatar name="weird Casing but Okay" casing="none" />
    </EuiFlexGroup>
    <EuiSpacer />
    <EuiTitle size="xs">
      <h4>Custom</h4>
    </EuiTitle>
    <EuiSpacer />
    <EuiFlexGroup responsive={false} gutterSize="xs">
      <EuiAvatar name="Kibana" initialsLength={2} />
      <EuiAvatar name="Leonardo Dude" initialsLength={1} />
      <EuiAvatar name="Not provided" initials="?" />
      <EuiAvatar name="Engineering User" initials="En" initialsLength={2} />
    </EuiFlexGroup>
  </>
);
