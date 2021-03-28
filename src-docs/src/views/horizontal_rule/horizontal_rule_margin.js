import React from 'react';

import { EuiHorizontalRule, EuiCode } from '../../../../src/components';

export default () => (
  <>
    <EuiCode>none</EuiCode>
    <div>
      <EuiHorizontalRule margin="none" />
    </div>
    <EuiCode>xs</EuiCode>
    <div>
      <EuiHorizontalRule margin="xs" />
    </div>
    <EuiCode>s</EuiCode>
    <div>
      <EuiHorizontalRule margin="s" />
    </div>
    <EuiCode>m</EuiCode>
    <div>
      <EuiHorizontalRule margin="m" />
    </div>
    <EuiCode>l (default)</EuiCode>
    <div>
      <EuiHorizontalRule margin="l" />
    </div>
    <EuiCode>xl</EuiCode>
    <div>
      <EuiHorizontalRule margin="xl" />
    </div>
    <EuiCode>xxl</EuiCode>
    <div>
      <EuiHorizontalRule margin="xxl" />
    </div>
  </>
);
