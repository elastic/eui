import React, { useState, Fragment } from 'react';

import {
  EuiButtonGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [disableButton, setDisableButton] = useState(false);
  const [fullButton, setFullButton] = useState(false);

  const basicButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'basicButtonGroup',
  });
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'multiSelectButtonGroup',
  });

  const toggleButtons = [
    {
      id: `${basicButtonGroupPrefix}__0`,
      label: 'Option one',
    },
    {
      id: `${basicButtonGroupPrefix}__1`,
      label: 'Option two is selected by default',
    },
    {
      id: `${basicButtonGroupPrefix}__2`,
      label: 'Option three',
    },
  ];

  const toggleButtonsMulti = [
    {
      id: `${multiSelectButtonGroupPrefix}__0`,
      label: 'Option 1',
    },
    {
      id: `${multiSelectButtonGroupPrefix}__1`,
      label: 'Option 2 is selected by default',
    },
    {
      id: `${multiSelectButtonGroupPrefix}__2`,
      label: 'Option 3',
    },
  ];

  const [toggleIdSelected, setToggleIdSelected] = useState(
    `${basicButtonGroupPrefix}__1`
  );

  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({
    [`${multiSelectButtonGroupPrefix}__1`]: true,
  });

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  const onChangeMulti = (optionId) => {
    const newToggleIdToSelectedMap = {
      ...toggleIdToSelectedMap,
      ...{
        [optionId]: !toggleIdToSelectedMap[optionId],
      },
    };
    setToggleIdToSelectedMap(newToggleIdToSelectedMap);
  };

  return (
    <Fragment>
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="Full width"
            checked={fullButton}
            onChange={() => setFullButton(!fullButton)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="Disabled"
            checked={disableButton}
            onChange={() => setDisableButton(!disableButton)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiPanel type="plain" hasBorder css={{ width: 600, maxWidth: '100%' }}>
        <EuiTitle size="xxs">
          <h3>Default</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          legend="Default single select button group"
          isFullWidth={fullButton}
          isDisabled={disableButton}
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={(id) => onChange(id)}
        />
        <EuiSpacer />
        <EuiTitle size="xxs">
          <h3>Primary color with multi select</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiButtonGroup
          legend="Primary color multi select button group"
          isFullWidth={fullButton}
          isDisabled={disableButton}
          options={toggleButtonsMulti}
          idToSelectedMap={toggleIdToSelectedMap}
          onChange={(id) => onChangeMulti(id)}
          color="primary"
          type="multi"
        />
      </EuiPanel>
    </Fragment>
  );
};
