import React from 'react';

import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';

export default () => (
  <div>
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
