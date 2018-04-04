import React from 'react';

import {
  EuiTitle,
  EuiHorizontalRule,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle size="l">
      <h1>This is a large title, only one should exist per page</h1>
    </EuiTitle>

    <EuiTitle>
      <h2>This is the default size for title</h2>
    </EuiTitle>

    <EuiTitle size="s">
      <h3>This is a small title</h3>
    </EuiTitle>

    <EuiTitle size="xs">
      <h4>This is an extra small title</h4>
    </EuiTitle>

    <EuiTitle size="xxs">
      <h5>This is an extra extra small title</h5>
    </EuiTitle>

    <EuiTitle size="xxxs">
      <h6>This is an extra extra extra small title and should only be used when the title is inconsequential (like a label)</h6>
    </EuiTitle>

    <EuiTitle size="xxxs" textTransform="uppercase">
      <h6>This is an extra extra extra small title that is uppercase</h6>
    </EuiTitle>


    <EuiHorizontalRule />

    <EuiTitle size="l">
      <span>Titles are markup agnostic, they only confer style</span>
    </EuiTitle>
  </div>
);
