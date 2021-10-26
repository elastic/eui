import React, { forwardRef, useState } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import { EuiDatePicker, EuiButton } from '../../../../src/components';

// Should be a component because the date picker does some ref stuff behind the scenes
// eslint-disable-next-line
const ExampleCustomInput = forwardRef(({ onClick, value }, ref) => {
  return (
    <EuiButton className="example-custom-input" onClick={onClick}>
      {value}
    </EuiButton>
  );
});

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

// eslint-disable-next-line react/no-multi-comp
export default () => {
  const [startDate, setStartDate] = useState(moment());

  return (
    <EuiDatePicker
      selected={startDate}
      onChange={setStartDate}
      customInput={<ExampleCustomInput />}
    />
  );
};
