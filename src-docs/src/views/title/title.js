import React from 'react';

import {
  EuiTitle,
  EuiHorizontalRule,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="l">
      <h1>This is a large title, only one should exist per page</h1>
    </EuiTitle>
    <EuiCode language="js">size=&quot;l&quot;</EuiCode>

    <EuiSpacer />
    <EuiTitle>
      <h2>This is the default size for title</h2>
    </EuiTitle>
    <EuiCode language="js">size=&quot;m&quot;</EuiCode>

    <EuiSpacer />
    <EuiTitle size="s">
      <h3>This is a small title</h3>
    </EuiTitle>
    <EuiCode language="js">size=&quot;s&quot;</EuiCode>

    <EuiSpacer />
    <EuiTitle size="xs">
      <h4>This is an extra small title</h4>
    </EuiTitle>
    <EuiCode language="js">size=&quot;xs&quot;</EuiCode>

    <EuiSpacer />
    <EuiTitle size="xxs">
      <h5>This is an extra extra small title</h5>
    </EuiTitle>
    <EuiCode language="js">size=&quot;xxs&quot;</EuiCode>

    <EuiSpacer />
    <EuiTitle size="xxxs">
      <h6>
        This is an extra extra extra small title and should only be used when
        the title is inconsequential (like a label)
      </h6>
    </EuiTitle>
    <EuiCode language="js">size=&quot;xxxs&quot;</EuiCode>

    <EuiHorizontalRule />

    <EuiTitle size="l">
      <span>Titles are markup agnostic, they only confer style</span>
    </EuiTitle>
  </div>
);
