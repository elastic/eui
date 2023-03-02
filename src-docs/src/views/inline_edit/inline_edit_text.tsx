import React, { useState } from 'react';

import {
  EuiInlineEditText,
  EuiSpacer,
  EuiButtonGroup,
  EuiInlineEditTextSizes,
} from '../../../../src';

export default () => {
  const textSizeButtons = [
    {
      id: 'xs',
      label: 'Extra Small',
    },
    {
      id: 's',
      label: 'Small',
    },
    {
      id: 'm',
      label: 'Medium',
    },
  ];

  const [toggleTextButtonSize, setToggleTextButtonSize] = useState<
    EuiInlineEditTextSizes
  >('m');

  const textSizeOnChange = (optionId: EuiInlineEditTextSizes) => {
    setToggleTextButtonSize(optionId);
  };

  return (
    <>
      <EuiButtonGroup
        legend="Text size"
        options={textSizeButtons}
        idSelected={toggleTextButtonSize as string}
        onChange={(id) => textSizeOnChange(id as EuiInlineEditTextSizes)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
        editModeProps={{
          icon: 'cross',
        }}
        readModeProps={{
          color: 'success',
        }}
      />
    </>
  );
};
