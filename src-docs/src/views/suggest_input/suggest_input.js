import React from 'react';

import { EuiSpacer, EuiSuggestInput } from '../../../../src/components';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    status: {
      icon: 'dot',
      name: 'Unsaved changes',
      label: 'KQL',
      color: '#DD0A73',
      tooltip: "You've made changes to this saved query. Click to save them.",
    },
    value:
      'products.category : “tanktop” and geoip.region : “australia” and price > 5',
  },
  {
    status: {
      icon: 'checkInCircleFilled',
      name: 'Changes just saved',
      label: 'KQL',
      color: 'secondary',
      tooltip: '',
    },
    value:
      'products.category : “tanktop” and geoip.region : “australia” and price > 5',
  },
  {
    status: {
      icon: '',
      name: 'All changes saved',
      label: 'KQL',
      color: 'secondary',
      tooltip: '',
    },
    value:
      'products.category : “tanktop” and geoip.region : “australia” and price > 5',
  },
];

export default () => (
  <div>
    {sampleItems.map(item => (
      <div>
        <EuiSuggestInput status={item.status} value={item.value} />
        <EuiSpacer size="m" />
      </div>
    ))}
  </div>
);
