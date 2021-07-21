import React, { useState } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix2 = htmlIdGenerator()();
const idPrefix3 = htmlIdGenerator()();

export default () => {
  const toggleButtonsCompressed = [
    {
      id: `${idPrefix2}3`,
      label: 'fine',
    },
    {
      id: `${idPrefix2}4`,
      label: 'rough',
    },
    {
      id: `${idPrefix2}5`,
      label: 'coarse',
    },
  ];

  const toggleButtonsIconsMulti = [
    {
      id: `${idPrefix3}3`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${idPrefix3}4`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
      isDisabled: true,
    },
    {
      id: `${idPrefix3}5`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${idPrefix3}6`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const [
    toggleIconIdToSelectedMapIcon,
    setToggleIconIdToSelectedMapIcon,
  ] = useState({});
  const [toggleCompressedIdSelected, setToggleCompressedIdSelected] = useState(
    `${idPrefix2}4`
  );

  const onChangeCompressed = (optionId) => {
    setToggleCompressedIdSelected(optionId);
  };

  const onChangeIconsMultiIcons = (optionId) => {
    const newToggleIconIdToSelectedMapIcon = {
      ...toggleIconIdToSelectedMapIcon,
      ...{
        [optionId]: !toggleIconIdToSelectedMapIcon[optionId],
      },
    };

    setToggleIconIdToSelectedMapIcon(newToggleIconIdToSelectedMapIcon);
  };

  return (
    <EuiPanel hasBorder style={{ maxWidth: 300 }}>
      <EuiButtonGroup
        name="coarsness"
        legend="This is a basic group"
        options={toggleButtonsCompressed}
        idSelected={toggleCompressedIdSelected}
        onChange={(id) => onChangeCompressed(id)}
        buttonSize="compressed"
        isFullWidth
      />
      <EuiSpacer />
      <EuiButtonGroup
        legend="Text style"
        className="eui-displayInlineBlock"
        options={toggleButtonsIconsMulti}
        idToSelectedMap={toggleIconIdToSelectedMapIcon}
        onChange={(id) => onChangeIconsMultiIcons(id)}
        type="multi"
        buttonSize="compressed"
        isIconOnly
      />
    </EuiPanel>
  );
};
