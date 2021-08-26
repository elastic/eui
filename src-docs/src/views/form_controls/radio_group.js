import React, { useState } from 'react';

import { EuiRadioGroup } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';
import { DisplayToggles } from './display_toggles';

const idPrefix = htmlIdGenerator()();

export default () => {
  const radios = [
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three is disabled',
      disabled: true,
    },
  ];

  const [radioIdSelected, setRadioIdSelected] = useState(`${idPrefix}1`);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canLoading={false}
      canReadOnly={false}
      canInvalid={false}
      canFullWidth={false}
    >
      <EuiRadioGroup
        options={radios}
        idSelected={radioIdSelected}
        onChange={(id) => onChange(id)}
        name="radio group"
        legend={{
          children: <span>This is a legend for a radio group</span>,
        }}
      />
    </DisplayToggles>
  );
};
