import React, { Fragment } from 'react';

import { EuiProgress, EuiSpacer } from '../../../../src/components';

const data = [
  { label: "Men's Clothing", valueText: '80' },
  { label: "Women's Clothing", valueText: '60' },
  { label: "Women's Shoes", valueText: '45' },
  { label: "Men's Shoes", valueText: '40' },
  { label: "Women's Accessories", valueText: '24' },
];

export default () => (
  <Fragment>
    <div style={{ maxWidth: 140 }}>
      {data.map(item => (
        <>
          <EuiProgress
            label={item.label}
            valueText={`${item.valueText}%`}
            value={item.valueText}
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
            valueText={`${item.valueText}%`}
            value={item.valueText}
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
