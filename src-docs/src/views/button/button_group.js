import React, { useState, Fragment } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';
import { EuiPanel } from '../../../../src/components/panel/panel';

const idPrefix = htmlIdGenerator()();
const idPrefix2 = htmlIdGenerator()();
const idPrefix3 = htmlIdGenerator()();

export default () => {
  const toggleButtons = [
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is selected by default',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three',
    },
  ];

  const toggleButtonsDisabled = [
    {
      id: `${idPrefix}3`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}4`,
      label: 'Option two is selected by default',
    },
    {
      id: `${idPrefix}5`,
      label: 'Option three',
    },
  ];

  const toggleButtonsMulti = [
    {
      id: `${idPrefix2}0`,
      label: 'Option 1',
    },
    {
      id: `${idPrefix2}1`,
      label: 'Option 2 is selected by default',
    },
    {
      id: `${idPrefix2}2`,
      label: 'Option 3',
    },
  ];

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

  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}1`);
  const [toggleIdDisabled, setToggleIdDisabled] = useState(`${idPrefix}4`);
  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({
    [`${idPrefix2}1`]: true,
  });
  const [toggleIconIdSelected, setToggleIconIdSelected] = useState(
    `${idPrefix3}1`
  );
  const [toggleIconIdToSelectedMap, setToggleIconIdToSelectedMap] = useState(
    {}
  );
  const [
    toggleIconIdToSelectedMapIcon,
    setToggleIconIdToSelectedMapIcon,
  ] = useState({});
  const [toggleCompressedIdSelected, setToggleCompressedIdSelected] = useState(
    `${idPrefix2}4`
  );

  const onChange = optionId => {
    setToggleIdSelected(optionId);
  };

  const onChangeDisabled = optionId => {
    setToggleIdDisabled(optionId);
  };

  const onChangeMulti = optionId => {
    const newToggleIdToSelectedMap = {
      ...toggleIdToSelectedMap,
      ...{
        [optionId]: !toggleIdToSelectedMap[optionId],
      },
    };
    setToggleIdToSelectedMap(newToggleIdToSelectedMap);
  };

  const onChangeIcons = optionId => {
    setToggleIconIdSelected(optionId);
  };

  const onChangeCompressed = optionId => {
    setToggleCompressedIdSelected(optionId);
  };

  const onChangeIconsMulti = optionId => {
    const newToggleIconIdToSelectedMap = {
      ...toggleIconIdToSelectedMap,
      ...{
        [optionId]: !toggleIconIdToSelectedMap[optionId],
      },
    };

    setToggleIconIdToSelectedMap(newToggleIconIdToSelectedMap);
  };

  const onChangeIconsMultiIcons = optionId => {
    const newToggleIconIdToSelectedMapIcon = {
      ...toggleIconIdToSelectedMapIcon,
      ...{
        [optionId]: !toggleIconIdToSelectedMapIcon[optionId],
      },
    };

    setToggleIconIdToSelectedMapIcon(newToggleIconIdToSelectedMapIcon);
  };

  return (
    <Fragment>
      <EuiButtonGroup
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={id => onChange(id)}
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Primary &amp; multi select</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="This is a primary group"
        name="primary"
        options={toggleButtonsMulti}
        idToSelectedMap={toggleIdToSelectedMap}
        onChange={id => onChangeMulti(id)}
        color="primary"
        type="multi"
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Disabled &amp; full width</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="This is a disabled group"
        name="disabledGroup"
        options={toggleButtonsDisabled}
        idSelected={toggleIdDisabled}
        onChange={id => onChangeDisabled(id)}
        buttonSize="m"
        isDisabled
        isFullWidth
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Icons only</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="Text align"
        name="textAlign"
        options={toggleButtonsIcons}
        idSelected={toggleIconIdSelected}
        onChange={id => onChangeIcons(id)}
        isIconOnly
      />
      &nbsp;&nbsp;
      <EuiButtonGroup
        legend="Text style"
        options={toggleButtonsIconsMulti}
        idToSelectedMap={toggleIconIdToSelectedMap}
        onChange={id => onChangeIconsMulti(id)}
        type="multi"
        isIconOnly
      />
      <EuiSpacer />
      <EuiPanel style={{ maxWidth: 300 }}>
        <EuiTitle size="xxxs">
          <h3>
            Compressed groups should always be fullWidth so they line up nicely
            in their small container.
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          name="coarsness"
          legend="This is a basic group"
          options={toggleButtonsCompressed}
          idSelected={toggleCompressedIdSelected}
          onChange={id => onChangeCompressed(id)}
          buttonSize="compressed"
          isFullWidth
        />
        <EuiSpacer />
        <EuiTitle size="xxxs">
          <h3>Unless they are icon only</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          name="textStyleCompressed"
          legend="Text style"
          className="eui-displayInlineBlock"
          options={toggleButtonsIconsMulti}
          idToSelectedMap={toggleIconIdToSelectedMapIcon}
          onChange={id => onChangeIconsMultiIcons(id)}
          type="multi"
          buttonSize="compressed"
          isIconOnly
        />
      </EuiPanel>
    </Fragment>
  );
};
