import React, { useState } from 'react';

import { EuiSuggest } from '../../../../src/components';

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

export default ({ onFocus, onBlur }: any) => {
  const status = 'unchanged';
  const [value, setValue] = useState('');

  console.log(value);

  const getInputValue = (val: React.SetStateAction<string>) => {
    setValue(val);
  };

  const onItemClick = (item: { label: React.SetStateAction<string> }) => {
    console.log(item);
    setValue(item.label);
  };

  return (
    <EuiSuggest
      status={status}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label="Filter"
      suggestions={sampleItems}
      onItemClick={onItemClick}
      onChange={getInputValue}
      isClearable
    />
  );
};
