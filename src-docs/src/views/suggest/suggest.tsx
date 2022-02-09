import React, { useState } from 'react';

import {
  EuiRadioGroup,
  EuiSuggest,
  EuiSpacer,
  EuiFormRow,
  EuiSuggestionProps,
} from '../../../../src/components';

import { EuiSuggestStatus } from '../../../../src/components/suggest/types';

import { htmlIdGenerator } from '../../../../src/services';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlSelector', color: 'tint2' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlOperand', color: 'tint1' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'tint8' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint3' },
    label: 'Saved search',
  },
];

const idPrefix = htmlIdGenerator()();

export default () => {
  const radios: Array<{
    id: string;
    value: EuiSuggestStatus;
    label: string;
  }> = [
    { id: `${idPrefix}0`, value: 'unchanged', label: 'No new changes' },
    { id: `${idPrefix}1`, value: 'unsaved', label: 'Not yet saved' },
    { id: `${idPrefix}2`, value: 'saved', label: 'Saved' },
    { id: `${idPrefix}3`, value: 'loading', label: 'Loading' },
  ];
  const [status, setStatus] = useState<EuiSuggestStatus>('unchanged');
  const [radioIdSelected, setSelectedId] = useState(`${idPrefix}0`);

  const onChange = (optionId: string) => {
    setSelectedId(optionId);
    setStatus(radios.find((x) => x.id === optionId)!.value);
  };

  const onItemClick = (item: EuiSuggestionProps) => {
    console.log(item);
  };

  return (
    <div>
      <EuiRadioGroup
        options={radios}
        idSelected={radioIdSelected}
        onChange={(id) => onChange(id)}
      />
      <EuiSpacer size="xl" />
      <EuiFormRow label="Suggest" id={idPrefix}>
        <EuiSuggest
          fullWidth
          aria-labelledby={`${idPrefix}-label`}
          status={status}
          onInputChange={() => {}}
          onItemClick={onItemClick}
          placeholder="Enter query to display suggestions"
          suggestions={sampleItems}
        />
      </EuiFormRow>
    </div>
  );
};
