/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';

describe('EuiDataGridControlHeaderCell', () => {
  const props = {
    index: 0,
    controlColumn: {
      id: 'someControlColumn',
      headerCellRender: () => <button data-euigrid-tab-managed="true" />,
      rowCellRender: () => <div />,
      width: 50,
    },
    headerIsInteractive: true,
  };

  it('renders', () => {
    const component = shallow(<EuiDataGridControlHeaderCell {...props} />);
    expect(component).toMatchInlineSnapshot(`
      <EuiDataGridHeaderCellWrapper
        className="euiDataGridHeaderCell--controlColumn"
        headerIsInteractive={true}
        id="someControlColumn"
        index={0}
        width={50}
      >
        <div
          className="euiDataGridHeaderCell__content"
        >
          <headerCellRender />
        </div>
      </EuiDataGridHeaderCellWrapper>
    `);
  });
});
