/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { EuiDataGridProps } from '../data_grid_types';
import { dataGridBodyProps } from './data_grid_body.test';

import { EuiDataGridBodyCustomRender } from './data_grid_body_custom';

describe('EuiDataGridBodyCustomRender', () => {
  type DataType = { columnA: string; columnB: string };
  const raw_data: DataType[] = [
    { columnA: 'hello', columnB: 'world' },
    { columnA: 'lorem', columnB: 'ipsum' },
  ];
  const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
    rowIndex,
    columnId,
  }) => raw_data[rowIndex][columnId as keyof DataType];

  const bodyProps = {
    ...dataGridBodyProps,
    rowCount: 2,
    visibleRows: { startRow: 0, endRow: 2, visibleRowCount: 2 },
    renderCellValue: RenderCellValue,
  };

  it('treats `renderCustomGridBody` as a render prop', () => {
    const CustomGridBody: EuiDataGridProps['renderCustomGridBody'] = ({
      visibleColumns,
      visibleRowData,
      headerRow,
      footerRow,
      Cell,
    }) => {
      const visibleRows = raw_data.slice(
        visibleRowData.startRow,
        visibleRowData.endRow
      );
      return (
        <>
          {headerRow}
          {visibleRows.map((row, rowIndex) => (
            <div role="row" key={rowIndex}>
              {visibleColumns.map((column, colIndex) => (
                <Cell
                  colIndex={colIndex}
                  visibleRowIndex={rowIndex}
                  key={`${rowIndex},${colIndex}`}
                />
              ))}
            </div>
          ))}
          {footerRow}
        </>
      );
    };

    const { container, getByText } = render(
      <EuiDataGridBodyCustomRender
        {...bodyProps}
        renderCustomGridBody={CustomGridBody}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText('hello')).toBeTruthy();
    expect(getByText('world')).toBeTruthy();
    expect(getByText('lorem')).toBeTruthy();
    expect(getByText('ipsum')).toBeTruthy();
  });

  it('allows passing props to the wrapping div via `setCustomGridBodyProps`', () => {
    const onScroll = jest.fn();

    let bodyRef: HTMLDivElement | null = null;
    const setBodyRef = (el: HTMLDivElement) => {
      bodyRef = el;
    };

    const CustomGridBody: EuiDataGridProps['renderCustomGridBody'] = ({
      setCustomGridBodyProps,
    }) => {
      useEffect(() => {
        setCustomGridBodyProps({
          className: 'hello-world',
          onScroll,
          ref: setBodyRef,
        });
      }, [setCustomGridBodyProps]);

      return <>hello world</>;
    };

    const { container, getByText } = render(
      <EuiDataGridBodyCustomRender
        {...bodyProps}
        renderCustomGridBody={CustomGridBody}
      />
    );
    expect(getByText('hello world')).toBeTruthy();

    const gridBody = container.querySelector(
      '.euiDataGrid__customRenderBody.hello-world'
    );
    expect(gridBody).toBeTruthy();

    fireEvent.scroll(gridBody!);
    expect(onScroll).toHaveBeenCalledTimes(1);

    bodyRef!.setAttribute('style', 'pointer-events: none;');
    expect(gridBody!.getAttribute('style')).toEqual('pointer-events: none;');
  });

  // More complex test cases involving pagination, auto height, etc can be found in Cypress .spec tests
});
