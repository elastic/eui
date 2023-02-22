import React, { useState } from 'react';

import {
  EuiInlineEdit,
  EuiSpacer,
  EuiButtonGroup,
  EuiTextProps,
} from '../../../../src';

export default () => {
  // Display Text Toggles
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
    {
      id: 'relative',
      label: 'Relative',
    },
  ];

  const [toggleTextButtonSize, setToggleTextButtonSize] = useState<
    EuiTextProps['size']
  >('m');

  const textOnChange = (optionId: EuiTextProps['size']) => {
    setToggleTextButtonSize(optionId);
  };

  return (
    <>
      <EuiButtonGroup
        legend="This is a basic group"
        options={textSizeButtons}
        idSelected={toggleTextButtonSize}
        onChange={(id: any) => textOnChange(id as EuiTextProps['size'])}
      />

      <EuiSpacer />

      <EuiInlineEdit
        display="text"
        inputAriaLabel="textControlInput"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
      />
    </>
  );
};
