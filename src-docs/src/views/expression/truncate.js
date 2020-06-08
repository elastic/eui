import React, { Fragment } from 'react';

import { EuiExpression, EuiSpacer, EuiTitle } from '../../../../src/components';

const value = 'and a very long string as value';
const description = 'some very very long description';
const nodes = (
  <Fragment>
    <p className="eui-textTruncate">.kibana_task_manager</p>
    <p className="eui-textTruncate">kibana_sample_data_ecommerce</p>
  </Fragment>
);

export default () => (
  <div>
    <div style={{ maxWidth: 240 }}>
      <EuiExpression
        onClick={() => {}}
        description={description}
        value={value}
        textWrap="truncate"
      />
      <EuiSpacer />
      <EuiExpression
        description={description}
        display="columns"
        text
        textWrap="truncate"
        value={value}
        onClick={() => {}}
      />
      <EuiSpacer />
    </div>
    <EuiTitle size="xxs">
      <h3>eui-textTruncate applied to sub-children</h3>
    </EuiTitle>
    <div style={{ maxWidth: 310 }}>
      <EuiExpression
        value={nodes}
        display="columns"
        text
        textWrap="truncate"
        description="indices"
        onClick={() => {}}
      />
    </div>
  </div>
);
