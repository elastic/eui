/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiButtonIcon } from '../button';
import { EuiCheckbox } from '../form';
import {
  EuiTable,
  EuiTableBody,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
} from './index';

import { EuiTableRow, EuiTableRowProps } from './table_row';

const meta: Meta<EuiTableRowProps> = {
  title: 'Tabular Content/EuiTable/EuiTableRow',
  component: EuiTableRow,
};

export default meta;
type Story = StoryObj<EuiTableRowProps>;

export const Playground: Story = {
  argTypes: {
    // For quicker/easier testing
    onClick: { control: 'boolean' },
  },
  args: {
    // @ts-ignore - using a switch for easiser testing
    onClick: false,
    // Set default booleans for easier toggling/testing
    hasActions: false,
    isExpandable: false,
    isExpandedRow: false,
    isSelectable: false,
    isSelected: false,
  },
  render: ({
    onClick,
    isSelectable,
    hasActions,
    isExpandable,
    isExpandedRow,
    ...args
  }) => (
    // Note: This is an approximate mock of what `EuiBasicTable` does for selection/actions/expansion
    <EuiTable tableLayout="auto">
      <EuiTableBody>
        <EuiTableRow
          onClick={!!onClick ? action('onClick') : undefined}
          isSelectable={isSelectable}
          hasActions={hasActions}
          isExpandable={isExpandable}
          {...args}
        >
          {isSelectable && (
            <EuiTableRowCellCheckbox>
              <EuiCheckbox
                id="selectRow"
                checked={args.isSelected}
                onChange={() => {}}
              />
            </EuiTableRowCellCheckbox>
          )}
          <EuiTableRowCell>First name</EuiTableRowCell>
          <EuiTableRowCell>Last name</EuiTableRowCell>
          <EuiTableRowCell>Some other data</EuiTableRowCell>
          {hasActions && (
            <EuiTableRowCell width="1%" hasActions={true}>
              <EuiButtonIcon iconType="copy" />
            </EuiTableRowCell>
          )}
          {isExpandable && (
            <EuiTableRowCell width="1%" isExpander={true}>
              <EuiButtonIcon iconType="arrowDown" />
            </EuiTableRowCell>
          )}
        </EuiTableRow>
        {isExpandedRow && (
          <EuiTableRow isExpandedRow={isExpandedRow}>
            <EuiTableRowCell width="100%" colSpan={100}>
              expanded content
            </EuiTableRowCell>
          </EuiTableRow>
        )}
      </EuiTableBody>
    </EuiTable>
  ),
};
