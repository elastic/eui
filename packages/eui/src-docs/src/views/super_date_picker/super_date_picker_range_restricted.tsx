import React, { useState } from 'react';

import {
  EuiSuperDatePicker,
  OnTimeChangeProps,
} from '../../../../src/components';
import moment from 'moment';

export default () => {
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const minDate = moment().subtract(1, 'M');
  const maxDate = moment().add(1, 'M');

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
  };

  return (
    <EuiSuperDatePicker
      start={start}
      end={end}
      minDate={minDate}
      maxDate={maxDate}
      onTimeChange={onTimeChange}
    />
  );
};
