import React from 'react';

import { EuiHorizontalRule, EuiCode } from '../../../../src/components';

export default () => (
  <>
    <EuiCode>quarter</EuiCode>
    <EuiHorizontalRule size="quarter" />
    <EuiCode>half</EuiCode>
    <EuiHorizontalRule size="half" />
    <EuiCode>full (default)</EuiCode>
    <EuiHorizontalRule />
  </>
);
