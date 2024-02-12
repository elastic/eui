import React, { useState } from 'react';

import {
  EuiInlineEditTitle,
  EuiSpacer,
  EuiButtonGroup,
  EuiTitleSize,
} from '../../../../src';

export default () => {
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
      label: 'Extra small',
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

  const [toggleTitleButtonSize, setToggleTitleButtonSize] =
    useState<EuiTitleSize>('m');

  const titleSizeOnChange = (optionId: EuiTitleSize) => {
    setToggleTitleButtonSize(optionId);
  };

  return (
    <>
      <EuiButtonGroup
        legend="Title size"
        options={titleSizeButtons}
        idSelected={toggleTitleButtonSize}
        onChange={(id) => titleSizeOnChange(id as EuiTitleSize)}
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        size={toggleTitleButtonSize}
        inputAriaLabel="Edit title inline"
        defaultValue="Hello World (but as a title)!"
      />
    </>
  );
};
