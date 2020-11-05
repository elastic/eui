import React, { useState } from 'react';

import { EuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(['20', '100']);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (value) => {
    setValue(value);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>
      <div className={isOpen ? '' : 'eui-showFor'}>
        <EuiDualRange
          id={htmlIdGenerator()()}
          min={0}
          max={200}
          step={10}
          value={value}
          onChange={onChange}
          showLabels
          aria-label="An example of EuiDualRange"
        />
      </div>
    </div>
  );
};
