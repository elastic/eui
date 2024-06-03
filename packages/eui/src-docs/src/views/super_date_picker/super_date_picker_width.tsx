import React, { useState } from 'react';

import {
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  OnTimeChangeProps,
} from '../../../../src/components';

export default ({
  width,
  compressed,
}: {
  width: EuiSuperDatePickerProps['width'];
  compressed: boolean;
}) => {
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
  };

  return (
    <EuiSuperDatePicker
      start={start}
      end={end}
      onTimeChange={onTimeChange}
      width={width}
      compressed={compressed}
    />
  );
};
