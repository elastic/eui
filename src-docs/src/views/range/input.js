import React, { useState, Fragment } from 'react';

import { EuiRange, EuiSpacer, EuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

  const rangeID__1 = htmlIdGenerator('range')();
  const rangeID__2 = htmlIdGenerator('range')();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onDualChange = (value) => {
    setDualValue(value);
  };

  return (
    <Fragment>
      <EuiRange
        id={rangeID__1}
        value={value}
        onChange={onChange}
        showInput
        aria-label="An example of EuiRange"
      />

      <EuiSpacer size="xl" />

      <EuiDualRange
        id={rangeID__2}
        value={dualValue}
        onChange={onDualChange}
        showInput
        minInputProps={{ 'aria-label': 'Min value' }}
        maxInputProps={{ 'aria-label': 'Max value' }}
        aria-label="An example of EuiDualRange with inputs"
      />
    </Fragment>
  );
};
