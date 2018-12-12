import React from 'react';

import { EuiExpression } from '../../../../src/components/expression';

export default () => (
  <div>
    <EuiExpression
      description="Select"
      value="count(*)"
      // tslint:disable no-empty
      onClick={() => {}}
    />
    <EuiExpression
      description="From"
      value="kibana_sample_data_ky_counties left"
    />
    <EuiExpression
      description="join"
      value="kibana_sample_data_ky_avl right"
      onClick={() => {}}
    />
    <EuiExpression
      description="on"
      value="left.smis = right.kytccountynmbr"
    />
    <EuiExpression
      description="group by"
      value="right.kytccountynmbr"
      onClick={() => {}}
    />
  </div>
);
