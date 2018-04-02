import React from 'react';

import {
  EuiTitle,
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="l">
      <h1>This is a large title</h1>
    </EuiTitle>

    <EuiTitle>
      <h2>This is the default size for title</h2>
    </EuiTitle>

    <EuiTitle size="s">
      <h3>This is a small title</h3>
    </EuiTitle>

    <EuiTitle size="xs">
      <h4>This is a extra small title</h4>
    </EuiTitle>

    <EuiTitle size="mini">
      <h5>This is a mini title</h5>
    </EuiTitle>

    <EuiTitle size="label">
      <h6>This is a label style headers ad should only be used when the header is inconsequential</h6>
    </EuiTitle>


    <EuiHorizontalRule />

    <EuiTitle size="l">
      <span>Titles are markup agnostic, they only confer style</span>
    </EuiTitle>
  </div>
);
