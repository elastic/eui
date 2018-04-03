import React from 'react';

import {
  EuiHorizontalRule,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="s"><span>Sizes</span></EuiTitle>
    <EuiSpacer />

    <p>quarter</p>
    <EuiHorizontalRule size="quarter"/>
    <p>half</p>
    <EuiHorizontalRule size="half"/>
    <p>full (default)</p>
    <EuiHorizontalRule />

    <EuiSpacer />
    <EuiTitle size="s"><span>Margins</span></EuiTitle>
    <EuiSpacer />

    <p>xs</p>
    <EuiHorizontalRule margin="xs" />
    <p>s</p>
    <EuiHorizontalRule margin="s" />
    <p>m</p>
    <EuiHorizontalRule margin="m" />
    <p>l (default)</p>
    <EuiHorizontalRule margin="l" />
    <p>xl</p>
    <EuiHorizontalRule margin="xl" />
    <p>xxl</p>
    <EuiHorizontalRule margin="xxl" />
  </div>
);
