import React, { useState } from 'react';

import { EuiFieldText } from '../../../../src/components';

export default function () {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <EuiFieldText
      placeholder="Placeholder text"
      value={value}
      onChange={(e) => onChange(e)}
      label="This text field has its own label prop"
    />
  );
}
