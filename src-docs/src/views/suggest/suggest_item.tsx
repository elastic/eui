import React from 'react';

import { EuiSuggestItem, EuiSuggest } from '../../../../src/components';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint5' },
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
    type: { iconType: 'search', color: 'tint10' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint7' },
    label: 'Saved query',
  },
];

const customWidthItems = [
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 30%',
    labelWidth: '30',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 50%',
    labelWidth: '50',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 80%',
    labelWidth: '80',
    description: shortDescription,
  },
];

const moreItems = [
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Items with no description will expand their label',
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Item with a description that wraps',
    description:
      'This is a long description. Fusce euismod dui eu metus sagittis molestie.',
    truncate: false,
  },
];

const allItems = sampleItems.concat(customWidthItems).concat(moreItems);

export default ({
  withInput,
  fullWidth,
  virtualized,
}: {
  withInput: boolean;
  fullWidth: boolean;
  virtualized: boolean;
}) => (
  <>
    {withInput ? (
      <EuiSuggest
        fullWidth={fullWidth}
        aria-label="Suggest"
        onInputChange={() => {}}
        // onItemClick={onItemClick}
        placeholder="Enter query to display suggestions"
        isVirtualized={virtualized}
        suggestions={allItems}
      />
    ) : (
      <div style={{ maxWidth: fullWidth ? undefined : '400px' }}>
        {allItems.map((item, index) => (
          <EuiSuggestItem key={index} {...item} />
        ))}
      </div>
    )}
  </>
);
