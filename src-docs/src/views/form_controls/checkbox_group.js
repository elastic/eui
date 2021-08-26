import React, { useState } from 'react';

import { EuiCheckboxGroup } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

import { htmlIdGenerator } from '../../../../src/services';
const idPrefix = htmlIdGenerator()();

export default () => {
  const checkboxes = [
    {
      id: `${idPrefix}0`,
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
      className: 'classNameTest',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three is disabled',
      disabled: true,
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix}1`]: true,
  });

  const onChange = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canLoading={false}
      canReadOnly={false}
      canInvalid={false}
      canFullWidth={false}
    >
      <EuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={(id) => onChange(id)}
      />
    </DisplayToggles>
  );
};
