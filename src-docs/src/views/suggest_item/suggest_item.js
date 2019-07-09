import React from 'react';

import { EuiSuggestItem } from '../../../../src/components/suggest_item';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { icon: 'kqlField', color: 'warning' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { icon: 'kqlValue', color: 'secondary' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { icon: 'kqlSelector', color: 'accent' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { icon: 'kqlOperand', color: 'primary' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { icon: 'search', color: 'text' },
    label: 'Recent search sample',
  },
  {
    type: { icon: 'save', color: 'vis3' },
    label: 'Saved search',
  },
];

export default () => (
  <div>
    {sampleItems.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    ))}
  </div>
);
