/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridCellButtons } from './data_grid_cell_buttons';

describe('EuiDataGridCellButtons', () => {
  const requiredProps = {
    popoverIsOpen: false,
    closePopover: jest.fn(),
    onExpandClick: jest.fn(),
    rowIndex: 0,
  };

  it('renders an expand button', () => {
    const component = shallow(<EuiDataGridCellButtons {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__expandButton"
      >
        <EuiI18n
          default="Click or hit enter to interact with cell content"
          key="expand"
          token="euiDataGridCellButtons.expandButtonTitle"
        >
          <Component />
        </EuiI18n>
      </div>
    `);

    const button: Function = component.find('EuiI18n').renderProp('children');
    expect(button('expandButtonTitle')).toMatchInlineSnapshot(`
      <EuiButtonIcon
        aria-hidden={true}
        className="euiDataGridRowCell__expandButtonIcon"
        color="primary"
        display="fill"
        iconSize="s"
        iconType="expandMini"
        onClick={[MockFunction]}
        title="expandButtonTitle"
      />
    `);
  });

  it('renders column cell actions', () => {
    const component = shallow(
      <EuiDataGridCellButtons
        {...requiredProps}
        column={{ id: 'someId', cellActions: [() => <button />] }}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRowCell__expandButton"
      >
        <Component
          Component={[Function]}
          closePopover={[MockFunction]}
          columnId="someId"
          isExpanded={false}
          key="0"
          rowIndex={0}
        />
        <EuiI18n
          default="Click or hit enter to interact with cell content"
          key="expand"
          token="euiDataGridCellButtons.expandButtonTitle"
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
