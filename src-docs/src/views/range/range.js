import React, { useState, Fragment } from 'react';

import { EuiRange, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('120');
  const rangeID__1 = htmlIdGenerator('range')();
  const rangeID__2 = htmlIdGenerator('range')();
  const rangeID__3 = htmlIdGenerator('range')();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <EuiRange
        id={rangeID__1}
        min={100}
        max={200}
        step={0.05}
        value={value}
        onChange={onChange}
        showLabels
        aria-label="An example of EuiRange with showLabels prop"
      />

      <EuiSpacer size="xl" />

      <EuiRange
        id={rangeID__2}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showValue
        aria-label="An example of EuiRange with showValue prop"
      />

      <EuiSpacer size="xl" />

      <EuiRange
        id={rangeID__3}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showRange
        showValue
        valuePrepend="100 - "
        aria-label="An example of EuiRange with valuePrepend prop"
      />
    </Fragment>
  );
};
