/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { keys } from '../../../services';

import { EuiDataGridCellPopover } from './data_grid_cell_popover';

describe('EuiDataGridCellPopover', () => {
  const requiredProps = {
    // column,
    rowIndex: 0,
    cellContentProps: {
      rowIndex: 0,
      columnId: 'someId',
      setCellProps: () => {},
      isExpandable: false,
      isExpanded: false,
      isDetails: false,
    },
    anchorContent: <button />,
    cellContentsRef: ((<div />) as unknown) as HTMLDivElement,
    panelRefFn: () => <div />,
    renderCellValue: () => <div />,
    popoverContent: () => <div />,
    popoverIsOpen: true,
    closePopover: jest.fn(),
  };

  it('renders', () => {
    const component = shallow(<EuiDataGridCellPopover {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <EuiPopover
        anchorClassName="euiDataGridRowCell__expand"
        anchorPosition="downCenter"
        button={<button />}
        closePopover={[MockFunction]}
        display="block"
        hasArrow={false}
        isOpen={true}
        onKeyDown={[Function]}
        ownFocus={true}
        panelClassName="euiDataGridRowCell__popover"
        panelPaddingSize="s"
        panelRef={[Function]}
        zIndex={8001}
      >
        <popoverContent
          cellContentsElement={<div />}
        >
          <renderCellValue
            columnId="someId"
            isDetails={true}
            isExpandable={false}
            isExpanded={false}
            rowIndex={0}
            setCellProps={[Function]}
          />
        </popoverContent>
      </EuiPopover>
    `);
  });

  it('renders popover content', () => {
    const component = shallow(
      <EuiDataGridCellPopover
        {...requiredProps}
        popoverIsOpen={true}
        column={{ id: 'someId', cellActions: [() => <button />] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <EuiPopover
        anchorClassName="euiDataGridRowCell__expand"
        anchorPosition="downCenter"
        button={<button />}
        closePopover={[MockFunction]}
        display="block"
        hasArrow={false}
        isOpen={true}
        onKeyDown={[Function]}
        ownFocus={true}
        panelClassName="euiDataGridRowCell__popover"
        panelPaddingSize="s"
        panelRef={[Function]}
        zIndex={8001}
      >
        <popoverContent
          cellContentsElement={<div />}
        >
          <renderCellValue
            columnId="someId"
            isDetails={true}
            isExpandable={false}
            isExpanded={false}
            rowIndex={0}
            setCellProps={[Function]}
          />
        </popoverContent>
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
          >
            <EuiFlexItem
              key="0"
            >
              <Component
                Component={[Function]}
                closePopover={[MockFunction]}
                columnId="someId"
                isExpanded={true}
                rowIndex={0}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      </EuiPopover>
    `);

    const button = component
      .find('EuiFlexItem')
      .children()
      .renderProp('Component');
    expect(button()).toMatchInlineSnapshot(`
      <EuiButtonEmpty
        size="s"
      />
    `);
  });

  it('handles closing the popover', () => {
    const component = shallow(<EuiDataGridCellPopover {...requiredProps} />);
    requiredProps.closePopover.mockImplementation(() => {
      component.setProps({ popoverIsOpen: false });
    });

    const event = {
      key: keys.ESCAPE,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    component.find('EuiPopover').simulate('keyDown', event);

    expect(requiredProps.closePopover).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    requiredProps.closePopover.mockReset();
  });
});
