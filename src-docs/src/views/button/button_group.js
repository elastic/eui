import React, { useState, Fragment } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const basicButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'basicButtonGroup',
  });
  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'multiSelectButtonGroup',
  });
  const disabledButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'disabledButtonGroup',
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

  const toggleButtonsDisabled = [
    {
      id: `${disabledButtonGroupPrefix}__0`,
      label: 'Option one',
    },
    {
      id: `${disabledButtonGroupPrefix}__1`,
      label: 'Option two is selected by default',
    },
    {
      id: `${disabledButtonGroupPrefix}__2`,
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
  const [toggleIdDisabled, setToggleIdDisabled] = useState(
    `${disabledButtonGroupPrefix}__1`
  );
  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({
    [`${multiSelectButtonGroupPrefix}__1`]: true,
  });

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  const onChangeDisabled = (optionId) => {
    setToggleIdDisabled(optionId);
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
      <EuiButtonGroup
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Primary &amp; multi select</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="This is a primary group"
        options={toggleButtonsMulti}
        idToSelectedMap={toggleIdToSelectedMap}
        onChange={(id) => onChangeMulti(id)}
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
        options={toggleButtonsDisabled}
        idSelected={toggleIdDisabled}
        onChange={(id) => onChangeDisabled(id)}
        buttonSize="m"
        isDisabled
        isFullWidth
      />
    </Fragment>
  );
};
