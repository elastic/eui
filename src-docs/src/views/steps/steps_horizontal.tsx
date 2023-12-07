import React, { useState } from 'react';

import {
  EuiStepsHorizontal,
  EuiStepsHorizontalProps,
  EuiStepsHorizontalSizes,
  EuiButtonGroup,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const horizontalSteps: EuiStepsHorizontalProps['steps'] = [
    {
      title: 'Completed step 1',
      status: 'complete',
      onClick: () => {},
    },
    {
      title: 'Selected step 2',
      status: 'current',
      onClick: () => {},
    },
    {
      title: 'Incomplete step 3 which will wrap to the next line',
      onClick: () => {},
    },
    {
      title: 'Disabled step 4',
      status: 'disabled',
      onClick: () => {},
    },
  ];

  const sizeButtons = [
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
  ];

  const [toggleSize, setToggleSize] = useState<EuiStepsHorizontalSizes>('m');

  const sizeOnChange = (optionId: EuiStepsHorizontalSizes) => {
    setToggleSize(optionId);
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Step Size</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="Horizontal step size toggle"
        options={sizeButtons}
        idSelected={toggleSize}
        onChange={(id) => sizeOnChange(id as EuiStepsHorizontalSizes)}
      />
      <EuiStepsHorizontal steps={horizontalSteps} size={toggleSize} />
    </>
  );
};
