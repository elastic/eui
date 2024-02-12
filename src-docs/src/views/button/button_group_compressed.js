import React, { useState } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const compressedToggleButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'compressedToggleButtonGroup',
  });
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'multiSelectButtonGroup',
  });

  const toggleButtonsCompressed = [
    {
      id: `${compressedToggleButtonGroupPrefix}__0`,
      label: 'fine',
    },
    {
      id: `${compressedToggleButtonGroupPrefix}__1`,
      label: 'rough',
    },
    {
      id: `${compressedToggleButtonGroupPrefix}__2`,
      label: 'coarse',
    },
  ];

  const toggleButtonsIconsMulti = [
    {
      id: `${multiSelectButtonGroupPrefix}__0`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${multiSelectButtonGroupPrefix}__1`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
      isDisabled: true,
    },
    {
      id: `${multiSelectButtonGroupPrefix}__2`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${multiSelectButtonGroupPrefix}__3`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const [toggleIconIdToSelectedMapIcon, setToggleIconIdToSelectedMapIcon] =
    useState({});
  const [toggleCompressedIdSelected, setToggleCompressedIdSelected] = useState(
    `${compressedToggleButtonGroupPrefix}__1`
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
