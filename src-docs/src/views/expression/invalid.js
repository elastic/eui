import React from 'react';

import { EuiExpression, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiExpression
      onClick={() => {}}
      description="sort by"
      value="count"
      isInvalid
    />
    <EuiSpacer />
    <div style={{ maxWidth: 220 }}>
      <EuiExpression
        description="email"
        display="columns"
        isInvalid
        value="example@mail."
        onClick={() => {}}
      />
    </div>
  </div>
);
