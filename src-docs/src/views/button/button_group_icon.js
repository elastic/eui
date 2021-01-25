import React, { useState, Fragment } from 'react';

import { EuiButtonGroup } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix3 = htmlIdGenerator()();

export default () => {
  const toggleButtonsIcons = [
    {
      id: `${idPrefix3}0`,
      label: 'Align left',
      iconType: 'editorAlignLeft',
    },
    {
      id: `${idPrefix3}1`,
      label: 'Align center',
      iconType: 'editorAlignCenter',
    },
    {
      id: `${idPrefix3}2`,
      label: 'Align right',
      iconType: 'editorAlignRight',
      isDisabled: true,
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

  const [toggleIconIdSelected, setToggleIconIdSelected] = useState(
    `${idPrefix3}1`
  );
  const [toggleIconIdToSelectedMap, setToggleIconIdToSelectedMap] = useState(
    {}
  );

  const onChangeIcons = (optionId) => {
    setToggleIconIdSelected(optionId);
  };

  const onChangeIconsMulti = (optionId) => {
    const newToggleIconIdToSelectedMap = {
      ...toggleIconIdToSelectedMap,
      ...{
        [optionId]: !toggleIconIdToSelectedMap[optionId],
      },
    };

    setToggleIconIdToSelectedMap(newToggleIconIdToSelectedMap);
  };

  return (
    <Fragment>
      <EuiButtonGroup
        legend="Text align"
        options={toggleButtonsIcons}
        idSelected={toggleIconIdSelected}
        onChange={(id) => onChangeIcons(id)}
        isIconOnly
      />
      &nbsp;&nbsp;
      <EuiButtonGroup
        legend="Text style"
        options={toggleButtonsIconsMulti}
        idToSelectedMap={toggleIconIdToSelectedMap}
        onChange={(id) => onChangeIconsMulti(id)}
        type="multi"
        isIconOnly
      />
    </Fragment>
  );
};
