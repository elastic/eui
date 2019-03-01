import React from 'react';

import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <p>xs: 4px</p>
    <EuiSpacer size="xs" />

    <br />
    <br />

    <p>s: 8px</p>
    <EuiSpacer size="s" />

    <br />
    <br />

    <p>m: 16px</p>
    <EuiSpacer size="m" />

    <br />
    <br />

    <p>l: 24px (this is the default)</p>
    <EuiSpacer />

    <br />
    <br />

    <p>xl: 32px</p>
    <EuiSpacer size="xl" />

    <br />
    <br />
    <p>xxl: 40px</p>
    <EuiSpacer size="xxl" />
  </div>
);
