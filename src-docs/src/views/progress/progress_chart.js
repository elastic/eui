import React, { Fragment } from 'react';

import { EuiProgress, EuiSpacer } from '../../../../src/components';

const data = [
  { label: "Men's Clothing", value: '80' },
  { label: "Women's Clothing", value: '60' },
  { label: "Women's Shoes", value: '45' },
  { label: "Men's Shoes", value: '40' },
  { label: "Women's Accessories", value: '24' },
];

export default () => (
  <Fragment>
    <div style={{ maxWidth: 140 }}>
      {data.map(item => (
        <>
          <EuiProgress
            label={item.label}
            valueText={true}
            value={item.value}
            max={100}
            color="secondary"
            size="s"
          />
          <EuiSpacer size="s" />
        </>
      ))}
    </div>
    <EuiSpacer size="m" />
    <div style={{ maxWidth: 200 }}>
      {data.map(item => (
        <>
          <EuiProgress
            label={item.label}
            valueText={true}
            value={item.value}
            max={100}
            color="primary"
            size="m"
          />
          <EuiSpacer size="s" />
        </>
      ))}
    </div>
  </Fragment>
);
