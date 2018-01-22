import React, {
  Component,
} from 'react';
import { times } from 'lodash';

import {
  EuiTableOfRecords,
} from '../../../../src/components';

const selectRandom = (...array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const records = times(5, (index) => {
  return {
    id: index,
    string: selectRandom('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan'),
    number: Math.floor(Math.random() * 20000),
    boolean: selectRandom(true, false),
    date: new Date(
      1990 + Math.floor(Math.random() * (1990 - 1971)), // year
      Math.floor(Math.random() * 12), // month
      Math.floor(Math.random() * 28), // day
      0, 0, 0, 0
    ),
  };
});

export default class extends Component {
  constructor(props) {
    super(props);

    this.data = {
      records,
      totalRecordCount: records.length,
    };
  }

  render() {
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

    const model = {
      data: this.data,
    };

    return (
      <EuiTableOfRecords config={config} model={model} />
    );
  }
}
