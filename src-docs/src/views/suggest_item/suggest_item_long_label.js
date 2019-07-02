import React from 'react';

import { EuiSuggestItem } from '../../../../src/components/suggest_item';

const shortDescription = 'This is the description';

const sampleItem = {
  type: { icon: 'kqlValue', color: 'secondary' },
  label: 'Charles de Gaulle International Airport',
  description: shortDescription,
};

export default () => (
  <div>
    <EuiSuggestItem
      type={sampleItem.type}
      label={sampleItem.label}
      description={sampleItem.description}
    />
    <EuiSuggestItem
      type={sampleItem.type}
      layout="inline"
      label={sampleItem.label}
      description={sampleItem.description}
    />
  </div>
);
