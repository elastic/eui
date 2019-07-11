import React from 'react';

import { EuiSuggestItem, EuiSpacer } from '../../../../src/components';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'itemTint03' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlValue', color: 'itemTint02' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlSelector', color: 'itemTint06' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlOperand', color: 'itemTint01' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'itemTint05' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'itemTint07' },
    label: 'Saved search',
  },
];

const sampleItem1 = {
  type: { iconType: 'kqlValue', color: 'itemTint02' },
  label: 'Charles de Gaulle International Airport',
  description: shortDescription,
};

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
    <EuiSpacer size="m" />
    <EuiSuggestItem
      type={sampleItem1.type}
      label={sampleItem1.label}
      description="This item has a fixed width label"
    />
    <EuiSuggestItem
      type={sampleItem1.type}
      labelDisplay="expand"
      label={sampleItem1.label}
      description="This item expands its label"
    />
    <EuiSpacer size="m" />
    <EuiSuggestItem
      type={{ iconType: 'search', color: 'itemTint05' }}
      label="Items with no description will expand their label"
    />
  </div>
);
