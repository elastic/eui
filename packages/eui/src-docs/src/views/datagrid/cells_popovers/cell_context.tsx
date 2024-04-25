import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridColumn,
  type RenderCellValue,
  EuiButton,
  EuiSpacer,
  EuiSkeletonText,
} from '../../../../../src';

type DataType = Array<{ [key: string]: ReactNode }>;

const columns: EuiDataGridColumn[] = [
  { id: 'firstName' },
  { id: 'lastName' },
  { id: 'suffix' },
  { id: 'boolean' },
];

const CellValue: RenderCellValue = ({
  rowIndex,
  columnId,
  // Props from cellContext
  data,
  isLoading,
}) => {
  if (isLoading) {
    return <EuiSkeletonText lines={1} />;
  }

  const value = data[rowIndex][columnId];
  return value;
};

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [data, setData] = useState<DataType>([]);
  const [cellContext, setCellContext] = useState({
    data,
    isLoading: false,
  });

  // Mock fetching data from an async API
  const mockLoading = useCallback(() => {
    setCellContext((context) => ({
      ...context,
      isLoading: true,
    }));

    // End the loading state after 3 seconds
    const timeout = setTimeout(() => {
      setCellContext((context) => ({
        ...context,
        isLoading: false,
      }));
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const fetchData = useCallback(() => {
    mockLoading();

    const data: DataType = [];
    for (let i = 1; i < 5; i++) {
      data.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        suffix: faker.person.suffix(),
        boolean: `${faker.datatype.boolean()}`,
      });
    }
    setData(data);
    setCellContext((context) => ({ ...context, data }));
  }, [mockLoading]);

  // Fetch data on page load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <EuiButton size="s" onClick={fetchData}>
        Fetch grid data
      </EuiButton>
      <EuiSpacer size="s" />
      <EuiDataGrid
        aria-label="Data grid example of cellContext"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={data.length}
        renderCellValue={CellValue}
        cellContext={cellContext}
      />
    </>
  );
};
