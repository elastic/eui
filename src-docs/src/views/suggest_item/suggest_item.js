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
    type: { icon: 'kqlSelector', color: '#7800A6' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { icon: 'kqlOperand', color: 'primary' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { icon: 'search', color: 'dark' },
    label: 'Recent search sample',
    description: shortDescription,
  },
  {
    type: { icon: 'save', color: '#DD0A73' },
    label: 'Saved search sample',
    description: shortDescription,
  },
];

export default () => (
  <div>
    {sampleItems.map(item => (
      <EuiSuggestItem
        type={item.type}
        label={item.label}
        description={item.description}
      />
    ))}
  </div>
);
