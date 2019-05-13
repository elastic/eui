import React from 'react';
import { EuiInMemoryTable } from '../../../../../src/components';

const data = [
  { animal: 'snail', weight: 25, humanFriendlyWeight: '25g' },
  { animal: 'peregrine falcon', weight: 900, humanFriendlyWeight: '0.9kg' },
  { animal: 'small dog', weight: 4500, humanFriendlyWeight: '4.5kg' },
  { animal: 'brown bear', weight: 180000, humanFriendlyWeight: '180kg' },
  { animal: 'elephant', weight: 5440000, humanFriendlyWeight: '5440kg' },
  { animal: 'giraffe', weight: 1180000, humanFriendlyWeight: '1180kg' },
];

export const Table = () => {
  const columns = [
    {
      field: 'animal',
      name: 'Animal',
      sortable: true,
    },
    {
      field: 'humanFriendlyWeight',
      name: 'Weight',
      sortable: ({ weight }) => weight,
    },
  ];

  const sorting = {
    sort: {
      field: 'humanFriendlyWeight',
      direction: 'asc',
    },
  };

  return (
    <EuiInMemoryTable
      items={data}
      columns={columns}
      pagination={false}
      sorting={sorting}
    />
  );
};
