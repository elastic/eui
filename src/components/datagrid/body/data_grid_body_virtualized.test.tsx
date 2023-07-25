/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '../../../test/rtl';

import { dataGridBodyProps } from './data_grid_body.test';

import { EuiDataGridBodyVirtualized } from './data_grid_body_virtualized';

describe('EuiDataGridBodyVirtualized', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 34,
    });
  });

  it('renders', () => {
    // EuiDataGridBody should be `render`ed here over `mount` due to large
    // snapshot memory issues
    const { container, getAllByTestSubject } = render(
      <EuiDataGridBodyVirtualized {...dataGridBodyProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getAllByTestSubject('dataGridRowCell')).toHaveLength(2);
  });

  it('renders leading columns, trailing columns, and footer rows', () => {
    const component = mount(
      <EuiDataGridBodyVirtualized
        {...dataGridBodyProps}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 30,
          },
        ]}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 40,
          },
        ]}
        visibleColCount={4}
        renderFooterCellValue={() => <footer data-test-subj="footer" />}
      />
    );
    expect(component.find('Cell')).toHaveLength(4);
    expect(component.find('[data-test-subj="footer"]')).toHaveLength(2);
  });

  it('passes some virtualization options to the underlying react-window grid', () => {
    const onItemsRendered = jest.fn();
    const component = mount(
      <EuiDataGridBodyVirtualized
        {...dataGridBodyProps}
        virtualizationOptions={{
          initialScrollTop: 50,
          className: 'test',
          onItemsRendered,
        }}
      />
    );
    expect(component.find('.test').exists()).toBe(true);
    expect(onItemsRendered).toHaveBeenCalled();
  });

  // TODO: Test final height/widths
});
