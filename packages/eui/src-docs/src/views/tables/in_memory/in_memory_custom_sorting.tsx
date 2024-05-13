import React from 'react';
import {
  EuiInMemoryTable,
  EuiInMemoryTableProps,
  EuiBasicTableColumn,
} from '../../../../../src/components';

type Data = {
  animal: string;
  weight: number;
};

const data: Data[] = [
  { animal: 'snail', weight: 25 },
  { animal: 'peregrine falcon', weight: 900 },
  { animal: 'small dog', weight: 4500 },
  { animal: 'brown bear', weight: 180000 },
  { animal: 'elephant', weight: 5440000 },
  { animal: 'giraffe', weight: 1180000 },
];

const columns: Array<EuiBasicTableColumn<Data>> = [
  {
    field: 'animal',
    name: 'Animal',
    sortable: true,
  },
  {
    name: 'Weight',
    render: ({ weight }: Data) => `${weight / 1000}kg`,
    sortable: ({ weight }) => weight,
  },
  {
    field: 'weight',
    name: 'Weight (grams)',
    sortable: true,
  },
];

export default () => {
  const sorting: EuiInMemoryTableProps<Data>['sorting'] = {
    sort: {
      field: 'weight',
      direction: 'asc',
    },
  };

  return (
    <EuiInMemoryTable
      tableCaption="Demo of EuiInMemoryTable with custom sorting"
      items={data}
      columns={columns}
      pagination={false}
      sorting={sorting}
    />
  );
};
