import React from 'react';

import { EuiDescriptionList } from '../../../../src/components';

const favoriteVideoGames = [
  {
    title: 'The Elder Scrolls: Morrowind',
    description: 'The opening music alone evokes such strong memories.',
  },
  {
    title: 'TIE Fighter',
    description:
      'The sequel to XWING, join the dark side and fly for the Emporer.',
  },
  {
    title: 'Quake 2',
    description: 'The game that made me drop out of college.',
  },
];

const discoverItems = [
  {
    title: 'category',
    description: "Men's Clothing",
  },
  {
    title: 'currency',
    description: 'EUR',
  },
  {
    title: 'customer_first_name',
    description: 'Abd',
  },
  {
    title: 'customer_full_name',
    description: 'Abd Farmer',
  },
  {
    title: 'customer_gender',
    description: 'MALE',
  },
  {
    title: 'customer_id',
    description: '52',
  },
  {
    title: 'customer_last_name',
    description: 'Farmer',
  },
  {
    title: 'customer_phone',
    description: '(empty)',
  },
  {
    title: 'customer_last_name',
    description: 'Farmer',
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
    title: 'geoip.city_name',
    description: 'Cairo',
  },
  {
    title: 'geoip.continent_name',
    description: 'Africa',
  },
];

export default () => (
  <>
    <EuiDescriptionList
      type="inline"
      listItems={favoriteVideoGames}
      style={{ maxWidth: '400px' }}
    />
    <br />
    <EuiDescriptionList
      type="inline"
      compressed
      listItems={discoverItems}
      style={{ maxWidth: '800px' }}
    />
  </>
);
