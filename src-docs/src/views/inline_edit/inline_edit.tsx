import React, { useState } from 'react';

import {
  EuiInlineEdit,
  EuiSpacer,
  EuiButtonGroup,
  EuiTextProps,
  EuiTitleSize,
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

  const [toggleTextButtonSize, setToggleTextButtonSize] = useState<EuiTextProps['size']>(
    'm'
  );

  const textOnChange = (optionId: TextSize) => {
    setToggleTextButtonSize(optionId);
  };

  // Display Title Toggles
  const titleSizeButtons = [
    {
      id: 'xxxs',
      label: '3X Small',
    },
    {
      id: 'xxs',
      label: '2X Small',
    },
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
      id: 'l',
      label: 'Large',
    },
  ];

  const [toggleTitleButtonSize, setToggleTitleButtonSize] = useState<
    EuiTitleSize
  >('m');

  const titleOnChange = (optionId: EuiTitleSize) => {
    setToggleTitleButtonSize(optionId);
  };

  return (
    <>
      <p>EuiInlineEdit - Text</p>

      <EuiSpacer />

      <EuiButtonGroup
        legend="This is a basic group"
        options={textSizeButtons}
        idSelected={toggleTextButtonSize}
        onChange={(id) => textOnChange(id as TextSize)}
      />

      <EuiSpacer />

      <EuiInlineEdit
        display="text"
        inputAriaLabel="textControlInput"
        defaultValue="Hello World!"
        size={toggleTextButtonSize}
      />

      <EuiSpacer />

      <p>EuiInlineEdit - Title</p>

      <EuiSpacer />

      <EuiButtonGroup
        legend="This is a basic group"
        options={titleSizeButtons}
        idSelected={toggleTitleButtonSize}
        onChange={(id) => titleOnChange(id as EuiTitleSize)}
      />

      <EuiSpacer />

      <EuiInlineEdit
        display="title"
        inputAriaLabel="textControlInput"
        defaultValue="Hello World (but as a title)!"
        size={toggleTitleButtonSize}
      />
    </>
  );
};
