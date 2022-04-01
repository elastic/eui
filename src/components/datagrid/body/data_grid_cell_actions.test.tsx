/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridColumnCellAction } from '../data_grid_types';
import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';

const MockAction: EuiDataGridColumnCellAction = ({ Component }) => (
  <Component iconType="starEmpty" data-test-subj="mockCellAction" />
);

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
        data-test-subj="euiDataGridCellExpandButton"
        display="fill"
        iconSize="s"
        iconType="expandMini"
        onClick={[MockFunction]}
        title="expandButtonTitle"
      />
    `);
  });

  it('renders cell actions as `EuiButtonIcon`s', () => {
    const component = shallow(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

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

  it('renders both cell actions and expand button', () => {
    const component = shallow(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__expandActions"
      >
        <MockAction
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
  });

  describe('visible cell actions limit', () => {
    it('by default, does not render more than the first two primary cell actions', () => {
      const component = shallow(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction],
          }}
        />
      );

      expect(component.find('MockAction')).toHaveLength(2);
    });

    it('allows configuring the default number of visible cell actions', () => {
      const component = shallow(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction, MockAction],
            visibleCellActions: 3,
          }}
        />
      );

      expect(component.find('MockAction')).toHaveLength(3);
    });
  });
});

describe('EuiDataGridCellPopoverActions', () => {
  it('renders column cell actions as `EuiButtonEmpty`s', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap={true}
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      </Fragment>
    `);

    const action = component.find('MockAction') as any;
    const button = action.renderProp('Component');
    expect(button({ iconType: 'function' })).toMatchInlineSnapshot(`
      <EuiButtonEmpty
        iconType="function"
        size="s"
      />
    `);
  });

  it('renders primary actions in their own footer, and all remaining secondary actions in a column footer', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{
          id: 'someId',
          cellActions: [MockAction, MockAction, MockAction],
        }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <Fragment>
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap={true}
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem
              key="1"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
        <EuiPopoverFooter>
          <EuiFlexGroup
            alignItems="flexStart"
            direction="column"
            gutterSize="s"
          >
            <EuiFlexItem
              key="0"
            >
              <div>
                <MockAction
                  Component={[Function]}
                  colIndex={0}
                  columnId="someId"
                  isExpanded={true}
                  rowIndex={0}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      </Fragment>
    `);
  });

  it('uses visibleCellActions to configure the number of primary vs. secondary actions', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{
          id: 'someId',
          cellActions: [MockAction, MockAction, MockAction, MockAction],
          visibleCellActions: 3,
        }}
      />
    );

    expect(
      component.find('EuiPopoverFooter').first().find('MockAction')
    ).toHaveLength(3);
    expect(
      component.find('EuiPopoverFooter').last().find('MockAction')
    ).toHaveLength(1);
  });

  it('does not render anything if the column has no cell actions', () => {
    const component = shallow(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'noActions' }}
      />
    );

    expect(component).toMatchInlineSnapshot('<Fragment />');
  });
});
