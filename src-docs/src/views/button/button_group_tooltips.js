import React, { useState } from 'react';

import { EuiButtonGroup } from '../../../../src/components';

export default () => {
  const toggleButtons = [
    {
      id: 'buttonGroup__0',
      label: 'Default title',
    },
    {
      id: 'buttonGroup__1',
      label: 'Custom tooltip content',
      toolTipContent: 'This is a custom tooltip',
    },
    {
      id: 'buttonGroup__2',
      label: 'Custom tooltip props',
      toolTipContent: 'This is another custom tooltip',
      toolTipProps: {
        title: 'My custom title',
        delay: 'regular',
        position: 'right',
      },
    },
  ];

  const [toggleIdSelected, setToggleIdSelected] = useState('buttonGroup__1');

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  return (
    <EuiButtonGroup
      legend="This is a group with tooltips"
      options={toggleButtons}
      idSelected={toggleIdSelected}
      onChange={(id) => onChange(id)}
    />
  );
};
