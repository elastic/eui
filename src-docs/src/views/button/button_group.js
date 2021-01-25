import React, { useState, Fragment } from 'react';

import {
  EuiButtonGroup,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();
const idPrefix2 = htmlIdGenerator()();

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

  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}1`);
  const [toggleIdDisabled, setToggleIdDisabled] = useState(`${idPrefix}4`);
  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({
    [`${idPrefix2}1`]: true,
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
