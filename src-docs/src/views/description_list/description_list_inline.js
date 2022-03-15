import React from 'react';

import { EuiDescriptionList, EuiPanel } from '../../../../src/components';

const discoverItems = [
  {
    title: 'category',
    description: "Women's Clothing, Women's Accessories",
  },
  {
    title: 'currency',
    description: 'EUR',
  },
  {
    title: 'customer_first_name',
    description: 'Yasmine',
  },
  {
    title: 'customer_full_name',
    description: 'Yasmine Portugal',
  },
  {
    title: 'customer_gender',
    description: 'FEMALE',
  },
  {
    title: 'customer_id',
    description: '52',
  },
  {
    title: 'customer_last_name',
    description: 'Portugal',
  },
  {
    title: 'customer_phone',
    description: '(empty)',
  },
  {
    title: 'day_of_week',
    description: 'Thursday',
  },
  {
    title: 'day_of_week_i',
    description: '3',
  },
  {
    title: 'email',
    description: 'abd@farmer-family.zzz',
  },
  {
    title: 'event.dataset',
    description: 'sample_ecommerce',
  },
  {
    title: 'geoip.continent_name',
    description: 'America',
  },
];

export default () => (
  <EuiPanel
    paddingSize="s"
    style={{ maxWidth: '800px' }}
    hasShadow={false}
    hasBorder
  >
    <EuiDescriptionList type="inline" listItems={discoverItems} />
  </EuiPanel>
);
