/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { EuiDataGridColumnCellAction } from '../../data_grid_types';
import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';

const MockAction: EuiDataGridColumnCellAction = ({ Component }) => (
  <Component iconType="starEmpty" data-test-subj="mockCellAction" />
);

describe('EuiDataGridCellActions', () => {
  const requiredProps = {
    onExpandClick: jest.fn(),
    popoverAnchorRef: () => {},
    rowIndex: 0,
    colIndex: 0,
    cellHeightType: 'default',
  };

  it('renders an expand button', () => {
    const { getByTestSubject } = render(
      <EuiDataGridCellActions {...requiredProps} />
    );

    expect(getByTestSubject('euiDataGridCellExpandButton'))
      .toMatchInlineSnapshot(`
      <button
        aria-hidden="true"
        class="euiButtonIcon euiDataGridRowCell__actionButtonIcon euiDataGridRowCell__expandCell emotion-euiButtonIcon-xs-fill-primary-euiDataGridRowCell__actionButtonIcon"
        data-test-subj="euiDataGridCellExpandButton"
        tabindex="-1"
        title="Click or hit enter to interact with cell content"
        type="button"
      >
        <span
          aria-hidden="true"
          class="euiButtonIcon__icon"
          color="inherit"
          data-euiicon-type="expand"
        />
      </button>
    `);
  });

  it('renders cell actions as `EuiButtonIcon`s', () => {
    const { getByTestSubject } = render(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(getByTestSubject('mockCellAction')).toMatchInlineSnapshot(`
      <button
        aria-hidden="true"
        class="euiButtonIcon euiDataGridRowCell__actionButtonIcon emotion-euiButtonIcon-xs-fill-primary-euiDataGridRowCell__actionButtonIcon"
        data-test-subj="mockCellAction"
        tabindex="-1"
        type="button"
      >
        <span
          aria-hidden="true"
          class="euiButtonIcon__icon"
          color="inherit"
          data-euiicon-type="starEmpty"
        />
      </button>
    `);
  });

  it('renders both cell actions and expand button', () => {
    const { getByTestSubject } = render(
      <EuiDataGridCellActions
        {...requiredProps}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(getByTestSubject('euiDataGridCellExpandButton')).toBeInTheDocument();
    expect(getByTestSubject('mockCellAction')).toBeInTheDocument();
  });

  describe('visible cell actions limit', () => {
    it('by default, does not render more than the first two primary cell actions', () => {
      const { getAllByTestSubject } = render(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction],
          }}
        />
      );

      expect(getAllByTestSubject('mockCellAction')).toHaveLength(2);
    });

    it('allows configuring the default number of visible cell actions', () => {
      const { getAllByTestSubject } = render(
        <EuiDataGridCellActions
          {...requiredProps}
          column={{
            id: 'someId',
            cellActions: [MockAction, MockAction, MockAction, MockAction],
            visibleCellActions: 3,
          }}
        />
      );

      expect(getAllByTestSubject('mockCellAction')).toHaveLength(3);
    });
  });
});

describe('EuiDataGridCellPopoverActions', () => {
  it('renders column cell actions as `EuiButtonEmpty`s', () => {
    const { getByTestSubject } = render(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'someId', cellActions: [MockAction] }}
      />
    );

    expect(getByTestSubject('mockCellAction')).toMatchInlineSnapshot(`
      <button
        class="euiButtonEmpty emotion-euiButtonDisplay-euiButtonEmpty-s-empty-primary"
        data-test-subj="mockCellAction"
        type="button"
      >
        <span
          class="euiButtonEmpty__content emotion-euiButtonDisplayContent"
        >
          <span
            color="inherit"
            data-euiicon-type="starEmpty"
          />
          <span
            class="eui-textTruncate euiButtonEmpty__text"
          />
        </span>
      </button>
    `);
  });

  it('renders primary actions in their own footer, and all remaining secondary actions in a column footer', () => {
    const { container } = render(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{
          id: 'someId',
          cellActions: [MockAction, MockAction, MockAction],
        }}
      />
    );

    expect(container.querySelectorAll('.euiPopoverFooter')).toHaveLength(2);
  });

  it('uses visibleCellActions to configure the number of primary vs. secondary actions', () => {
    const { container } = render(
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

    const footers = container.querySelectorAll('.euiPopoverFooter');
    expect(footers[0].querySelectorAll('button')).toHaveLength(3);
    expect(footers[1].querySelectorAll('button')).toHaveLength(1);
  });

  it('does not render anything if the column has no cell actions', () => {
    const { container } = render(
      <EuiDataGridCellPopoverActions
        colIndex={0}
        rowIndex={0}
        column={{ id: 'noActions' }}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
