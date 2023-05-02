import React, { useState, KeyboardEvent } from 'react';

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

  const [toggleTextButtonSize, setToggleTextButtonSize] = useState<
    EuiInlineEditTextProps['size']
  >('m');

  const textSizeOnChange = (optionId: EuiInlineEditTextProps['size']) => {
    setToggleTextButtonSize(optionId);
  };

  const customKeyDown = (event: KeyboardEvent) => {
    // if (event.key === 'Enter') {
    //   alert('Hey this is a custom keydown message!');
    // } else {
    //   return;
    // }
    switch (event.key) {
      case 'Enter':
        alert('Hey this is a custom keydown message!');
        break;
    }
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
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
        editModeProps={{
          inputProps: {
            onKeyDown: customKeyDown,
          },
        }}
      />
    </>
  );
};
