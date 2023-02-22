import React, { useState } from 'react';

import {
  EuiInlineEdit,
  EuiSpacer,
  EuiButtonGroup,
  EuiTitleSize,
} from '../../../../src';

export default () => {
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
