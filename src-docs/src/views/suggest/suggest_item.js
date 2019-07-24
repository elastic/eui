import React from 'react';

import { EuiSuggestItem, EuiSpacer } from '../../../../src/components';

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
    type: { iconType: 'kqlSelector', color: 'tint3' },
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
    type: { iconType: 'save', color: 'tint5' },
    label: 'Saved query',
  },
];

const typeObj = { iconType: 'kqlValue', color: 'tint0' };

const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

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
      type={typeObj}
      label={longLabel}
      description="This item has a fixed width label"
    />
    <EuiSuggestItem
      type={typeObj}
      labelDisplay="expand"
      label={longLabel}
      description="This item will expand its label if needed"
    />
    <EuiSpacer size="m" />
    <EuiSuggestItem
      type={{ iconType: 'search', color: 'tint8' }}
      label="Items with no description will expand their label"
    />
  </div>
);
