import React from 'react';
import { times } from 'lodash';

import {
  Random
} from '../../../../src/services';

import {
  EuiTableOfRecords,
} from '../../../../src/components';

const random = new Random();

const records = times(5, (index) => {
  return {
    id: index,
    string: random.oneOf(['Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan']),
    number: random.integer({ min: 0, max: 2000000 }),
    boolean: random.boolean(),
    date: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) })
  };
});

const model = {
  data: { records }
};

const config = {
  recordId: 'id',
  columns: [
    {
      field: 'string',
      name: 'string',
      dataType: 'string',
    },
    {
      field: 'number',
      name: 'number',
      dataType: 'number'
    },
    {
      field: 'boolean',
      name: 'boolean',
      dataType: 'boolean'
    },
    {
      field: 'date',
      name: 'date',
      dataType: 'date'
    },
  ],
};

export default () => {
  return <EuiTableOfRecords config={config} model={model} />;
};
