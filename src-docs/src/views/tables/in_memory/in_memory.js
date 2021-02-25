import React, { useState, useMemo } from 'react';
import { EuiInMemoryTable, EuiButtonIcon } from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

let tableCounter = 0;

export const Table = () => {
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});

  const toggleDetails = (item) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      itemIdToExpandedRowMapValues[item.id] = <Table />;
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns = [
    {
      field: 'row',
      name: 'Row Name',
      width: '4em',
    },
    {
      isExpander: true,
      width: '1em',
      render: (item) => (
        <EuiButtonIcon
          aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
          iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
        />
      ),
    },
  ];

  const items = useMemo(() => {
    function createItems(count) {
      let index = 0;
      tableCounter++;
      return Array.apply(0, Array(count)).map(() => ({
        id: `${++index}`,
        row: `row ${index} in table ${tableCounter}`,
      }));
    }
    return createItems(5);
  }, []);

  return (
    <EuiInMemoryTable
      items={items}
      itemId="id"
      itemIdToExpandedRowMap={itemIdToExpandedRowMap}
      isExpandable={true}
      columns={columns}
      rowProps={(row) => ({ onClick: () => toggleDetails(row) })}
    />
  );
};
