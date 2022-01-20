/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';

describe('EuiDataGridCellActions', () => {
  const requiredProps = {
    closePopover: jest.fn(),
    onExpandClick: jest.fn(),
    rowIndex: 0,
    colIndex: 0,
  };

  it('renders an expand button', () => {
    const component = shallow(<EuiDataGridCellActions {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__expandActions"
      >
        <EuiI18n
          default="Click or hit enter to interact with cell content"
          key="expand"
          token="euiDataGridCellActions.expandButtonTitle"
        >
          <Component />
        </EuiI18n>
      </div>
    `);

    const button: Function = component.find('EuiI18n').renderProp('children');
    expect(button('expandButtonTitle')).toMatchInlineSnapshot(`
      <EuiButtonIcon
        aria-hidden={true}
        className="euiDataGridRowCell__actionButtonIcon"
        color="primary"
        display="fill"
        iconSize="s"
        iconType="expandMini"
        onClick={[MockFunction]}
        title="expandButtonTitle"
      />
    `);
  });

  it('renders column cell actions as `EuiButtonIcon`s', () => {
    const component = shallow(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [() => <button />] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__expandActions"
      >
        <Component
          Component={[Function]}
          closePopover={[MockFunction]}
          colIndex={0}
          columnId="someId"
          isExpanded={false}
          key="0"
          rowIndex={0}
        />
        <EuiI18n
          default="Click or hit enter to interact with cell content"
          key="expand"
          token="euiDataGridCellActions.expandButtonTitle"
        >
          <Component />
        </EuiI18n>
      </div>
    `);

    const button = component.childAt(0).renderProp('Component');
    expect(button({ iconType: 'eye' })).toMatchInlineSnapshot(`
      <EuiButtonIcon
        aria-hidden={true}
        className="euiDataGridRowCell__actionButtonIcon"
        iconSize="s"
        iconType="eye"
      />
    `);
  });
});

describe('EuiDataGridCellPopoverActions', () => {
  it('renders column cell actions as `EuiButtonEmpty`s', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'someId', cellActions: [() => <button />] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <EuiPopoverFooter>
        <EuiFlexGroup
          gutterSize="s"
        >
          <EuiFlexItem
            key="0"
          >
            <Component
              Component={[Function]}
              colIndex={0}
              columnId="someId"
              isExpanded={true}
              rowIndex={0}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopoverFooter>
    `);

    const button = component
      .childAt(0)
      .childAt(0)
      .childAt(0) // .find('Component') doesn't work, for whatever reason
      .renderProp('Component');
    expect(button({ iconType: 'function' })).toMatchInlineSnapshot(`
      <EuiButtonEmpty
        iconType="function"
        size="s"
      />
    `);
  });

  it('does not render anything if the column has no cell actions', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'noActions' }}
      />
    );

    expect(component.isEmptyRender()).toBe(true);
  });
});
