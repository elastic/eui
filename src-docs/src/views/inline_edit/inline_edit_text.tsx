import React, { useState } from 'react';

import {
  EuiInlineEditText,
  EuiSpacer,
  EuiButtonGroup,
  EuiInlineEditTextProps,
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

  const [toggleTextButtonSize, setToggleTextButtonSize] =
    useState<EuiInlineEditTextProps['size']>('m');

  const textSizeOnChange = (optionId: EuiInlineEditTextProps['size']) => {
    setToggleTextButtonSize(optionId);
  };

  return (
    <>
      <EuiButtonGroup
        legend="Text size"
        options={textSizeButtons}
        idSelected={toggleTextButtonSize as string}
        onChange={(id) =>
          textSizeOnChange(id as EuiInlineEditTextProps['size'])
        }
      />

      <EuiSpacer />

      <EuiInlineEditText
        size={toggleTextButtonSize}
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
      />
    </>
  );
};
