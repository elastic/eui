import React, { useEffect, memo } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGridProps,
  EuiDataGridColumnCellActionProps,
  EuiScreenReaderOnly,
  EuiCheckbox,
  EuiCallOut,
  EuiButton,
  EuiButtonIcon,
} from '../../../../../../src';

/**
 * Mock data
 */
export const raw_data: Array<{ [key: string]: string }> = [];
for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: `${faker.person.lastName()}, ${faker.person.firstName()}`,
    email: faker.internet.email(),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    date: `${faker.date.past()}`,
    amount: faker.commerce.price({ min: 1, max: 1000, dec: 2, symbol: '$' }),
    feesOwed: faker.datatype.boolean() ? 'true' : '',
  });
}
const footer_data: { [key: string]: string } = {
  amount: `Total: ${raw_data
    .reduce((acc, { amount }) => acc + Number(amount.split('$')[1]), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
};

/**
 * Columns
 */
export const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    cellActions: [
      ({ Component }: EuiDataGridColumnCellActionProps) => (
        <Component
          onClick={() => alert('action')}
          iconType="faceHappy"
          aria-label="Some action"
        >
          Some action
        </Component>
      ),
    ],
  },
  {
    id: 'email',
    displayAsText: 'Email address',
    initialWidth: 130,
  },
  {
    id: 'location',
    displayAsText: 'Location',
  },
  {
    id: 'date',
    displayAsText: 'Date',
  },
  {
    id: 'amount',
    displayAsText: 'Amount',
  },
];

/**
 * Cell component
 */
export const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
  rowIndex,
  columnId,
}) => raw_data[rowIndex][columnId];

/**
 * Row details component
 */
// eslint-disable-next-line local/forward-ref
const RenderRowDetails: EuiDataGridProps['renderCellValue'] = memo(
  ({ setCellProps, rowIndex }) => {
    setCellProps({ style: { width: '100%', height: 'auto' } });

    // Mock data
    const firstName = raw_data[rowIndex].name.split(', ')[1];
    const hasFees = !!raw_data[rowIndex].feesOwed;

    return (
      <EuiCallOut
        size="s"
        color={hasFees ? 'danger' : 'success'}
        iconType={hasFees ? 'errorFilled' : 'checkInCircleFilled'}
        title={`${firstName}'s account has ${
          hasFees ? '' : 'no'
        } outstanding fees`}
      >
        {hasFees && (
          <EuiButton color="danger" size="s">
            Send an email reminder
          </EuiButton>
        )}
      </EuiCallOut>
    );
  }
);

/**
 * Control columns
 */
export const leadingControlColumns: EuiDataGridProps['leadingControlColumns'] =
  [
    {
      id: 'selection',
      width: 32,
      headerCellRender: () => (
        <EuiCheckbox
          id="select-all-rows"
          aria-label="Select all rows"
          onChange={() => {}}
        />
      ),
      rowCellRender: ({ rowIndex }) => (
        <EuiCheckbox
          id={`select-row-${rowIndex}`}
          aria-label="Select row"
          onChange={() => {}}
        />
      ),
    },
  ];
export const trailingControlColumns: EuiDataGridProps['trailingControlColumns'] =
  [
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => (
        <EuiScreenReaderOnly>
          <span>Actions</span>
        </EuiScreenReaderOnly>
      ),
      rowCellRender: () => (
        <EuiButtonIcon
          iconType="boxesHorizontal"
          aria-label="See row actions"
        />
      ),
    },
    // The custom row details is actually a trailing control column cell with
    // a hidden header. This is important for accessibility and markup reasons
    // @see https://fuschia-stretch.glitch.me/ for more
    {
      id: 'row-details',

      // The header cell should be visually hidden, but available to screen readers
      width: 0,
      headerCellRender: () => <>Row details</>,
      headerCellProps: { className: 'euiScreenReaderOnly' },

      // The footer cell can be hidden to both visual & SR users, as it does not contain meaningful information
      footerCellProps: { style: { display: 'none' } },

      // When rendering this custom cell, we'll want to override
      // the automatic width/heights calculated by EuiDataGrid
      rowCellRender: RenderRowDetails,
    },
  ];

/**
 * Footer cell component
 */
export const RenderFooterCellValue: EuiDataGridProps['renderFooterCellValue'] =
  ({ columnId, setCellProps }) => {
    const value = footer_data[columnId];

    useEffect(() => {
      // Turn off the cell expansion button if the footer cell is empty
      if (!value) setCellProps({ isExpandable: false });
    }, [value, setCellProps, columnId]);

    return value || null;
  };
