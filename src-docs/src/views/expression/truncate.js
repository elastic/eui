import React from 'react';

import { EuiExpression, EuiSpacer } from '../../../../src/components';

const value = 'and a very long string as value';
const description = 'some very very long description';

export default () => (
  <div style={{ maxWidth: 240 }}>
    <EuiExpression
      onClick={() => {}}
      description={description}
      value={value}
      textWrap="truncate"
    />
    <EuiSpacer />
    <EuiExpression
      description="some very long description"
      display="columns"
      text
      textWrap="truncate"
      value={value}
      onClick={() => {}}
    />
  </div>
);
