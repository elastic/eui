import React from 'react';

import { EuiDataGrid } from '../../../../src/components/';

const columns = [
  {
    name: 'name',
  },
  {
    name: 'avatar_url',
  },
  {
    name: 'url',
  },
  {
    name: 'contributions',
  },
];

const data = [
  {
    name: 'cjcenizal',
    avatar_url: 'https://avatars2.githubusercontent.com/u/1238659?v=4',
    url: 'https://api.github.com/users/cjcenizal',
    contributions: 392,
  },
  {
    name: 'snide',
    avatar_url: 'https://avatars3.githubusercontent.com/u/324519?v=4',
    url: 'https://api.github.com/users/snide',
    contributions: 361,
  },
  {
    name: 'chandlerprall',
    avatar_url: 'https://avatars3.githubusercontent.com/u/313125?v=4',
    url: 'https://api.github.com/users/chandlerprall',
    contributions: 274,
  },
  {
    name: 'cchaos',
    avatar_url: 'https://avatars3.githubusercontent.com/u/549577?v=4',
    url: 'https://api.github.com/users/cchaos',
    contributions: 156,
  },
  {
    name: 'bevacqua',
    avatar_url: 'https://avatars3.githubusercontent.com/u/934293?v=4',
    url: 'https://api.github.com/users/bevacqua',
    contributions: 128,
  },
  {
    name: 'thompsongl',
    avatar_url: 'https://avatars0.githubusercontent.com/u/2728212?v=4',
    url: 'https://api.github.com/users/thompsongl',
    contributions: 106,
  },
  {
    name: 'pugnascotia',
    avatar_url: 'https://avatars1.githubusercontent.com/u/8696382?v=4',
    url: 'https://api.github.com/users/pugnascotia',
    contributions: 82,
  },
  {
    name: 'nreese',
    avatar_url: 'https://avatars0.githubusercontent.com/u/373691?v=4',
    url: 'https://api.github.com/users/nreese',
    contributions: 58,
  },
  {
    name: 'dmeiss',
    avatar_url: 'https://avatars3.githubusercontent.com/u/45879454?v=4',
    url: 'https://api.github.com/users/dmeiss',
    contributions: 52,
  },
  {
    name: 'ryankeairns',
    avatar_url: 'https://avatars2.githubusercontent.com/u/446285?v=4',
    url: 'https://api.github.com/users/ryankeairns',
    contributions: 32,
  },
  {
    name: 'stacey-gammon',
    avatar_url: 'https://avatars3.githubusercontent.com/u/16563603?v=4',
    url: 'https://api.github.com/users/stacey-gammon',
    contributions: 24,
  },
  {
    name: 'theodesp',
    avatar_url: 'https://avatars0.githubusercontent.com/u/328805?v=4',
    url: 'https://api.github.com/users/theodesp',
    contributions: 22,
  },
  {
    name: 'uboness',
    avatar_url: 'https://avatars3.githubusercontent.com/u/211019?v=4',
    url: 'https://api.github.com/users/uboness',
    contributions: 17,
  },
  {
    name: 'weltenwort',
    avatar_url: 'https://avatars3.githubusercontent.com/u/973741?v=4',
    url: 'https://api.github.com/users/weltenwort',
    contributions: 16,
  },
  {
    name: 'jen-huang',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1965714?v=4',
    url: 'https://api.github.com/users/jen-huang',
    contributions: 13,
  },
  {
    name: 'PopradiArpad',
    avatar_url: 'https://avatars3.githubusercontent.com/u/4144816?v=4',
    url: 'https://api.github.com/users/PopradiArpad',
    contributions: 11,
  },
  {
    name: 'chrisronline',
    avatar_url: 'https://avatars1.githubusercontent.com/u/56682?v=4',
    url: 'https://api.github.com/users/chrisronline',
    contributions: 10,
  },
  {
    name: 'timroes',
    avatar_url: 'https://avatars0.githubusercontent.com/u/877229?v=4',
    url: 'https://api.github.com/users/timroes',
    contributions: 10,
  },
  {
    name: 'daveyholler',
    avatar_url: 'https://avatars2.githubusercontent.com/u/739960?v=4',
    url: 'https://api.github.com/users/daveyholler',
    contributions: 9,
  },
  {
    name: 'sqren',
    avatar_url: 'https://avatars3.githubusercontent.com/u/209966?v=4',
    url: 'https://api.github.com/users/sqren',
    contributions: 9,
  },
];

export default () => {
  return (
    <div>
      <EuiDataGrid
        columns={columns}
        rowCount={data.length}
        renderCellValue={(row, columnName) => data[row][columnName]}
      />
    </div>
  );
};
