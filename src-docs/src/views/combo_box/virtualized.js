import React, { useState } from 'react';

import { EuiComboBox } from '../../../../src/components';

const options = [];
let groupOptions = [];
for (let i = 1; i < 5000; i++) {
  groupOptions.push({ label: `option${i}` });
  if (i % 25 === 0) {
    options.push({
      label: `Options ${i - (groupOptions.length - 1)} to ${i}`,
      options: groupOptions,
    });
    groupOptions = [];
  }
}

export default () => {
  const [selectedOptions, setSelected] = useState([]);

  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
