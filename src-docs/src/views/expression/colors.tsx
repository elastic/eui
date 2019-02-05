import React from 'react';

import { EuiExpression } from '../../../../src/components/expression';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <EuiExpression description='Secondary' value='isDefault()' />
    <EuiSpacer size='s' />
    <EuiExpression description='Primary' value='color()' color='primary' />
    <EuiSpacer size='s' />
    <EuiExpression description='accent' value='color()' color='accent' />
    <EuiSpacer size='s' />
    <EuiExpression description='warning' value='color()' color='warning' />
    <EuiSpacer size='s' />
    <EuiExpression description='danger' value='color()' color='danger' />
    <EuiSpacer size='s' />
    <EuiExpression description='subdued' value='color()' color='subdued' />
    <EuiSpacer size='s' />
    <EuiExpression
      description='active'
      value='state will get color() as well'
      color='accent'
      isActive
    />
  </div>
);
