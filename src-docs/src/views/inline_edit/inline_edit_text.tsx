import React, { useState } from 'react';

import {
  EuiInlineEditText,
  EuiSpacer,
  EuiButtonGroup,
  EuiInlineEditTextProps,
  EuiSwitch,
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

  /* isReadOnly toggle */
  const [isReadOnly, setIsReadOnly] = useState(false);

  const onChange = (e: any) => {
    setIsReadOnly(e.target.checked);
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

      <EuiSwitch
        label="isReadOnly"
        checked={isReadOnly}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
        isReadOnly={isReadOnly}
      />
    </>
  );
};
