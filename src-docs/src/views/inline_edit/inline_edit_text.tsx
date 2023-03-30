import React, { useState } from 'react';

import {
  EuiInlineEditText,
  EuiSpacer,
  EuiButtonGroup,
  EuiInlineEditTextSizes,
  EuiCheckbox,
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

  const [isInvalidChecked, setIsInvalidChecked] = useState(false);
  const [isLoadingChecked, setIsLoadingChecked] = useState(false);

  const toggleIsInvalid = (e: any) => setIsInvalidChecked(e.target.checked);
  const toggleisLoading = (e: any) => setIsLoadingChecked(e.target.checked);

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

      <EuiCheckbox
        id="isInvalidCheckbox"
        label="Toggle Validation"
        checked={isInvalidChecked}
        onChange={(e) => toggleIsInvalid(e)}
      />

      <EuiCheckbox
        id="isLoadingChecbox"
        label="Toggle Loading State"
        checked={isLoadingChecked}
        onChange={(e) => toggleisLoading(e)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
        isInvalid={isInvalidChecked}
        isLoading={isLoadingChecked}
      />
    </>
  );
};
