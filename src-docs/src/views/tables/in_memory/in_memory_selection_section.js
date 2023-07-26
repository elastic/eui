import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';

import Table from './in_memory_selection';
import { EuiInMemoryTable } from '../../../../../src/components/basic_table/in_memory_table';
import {
  Criteria,
  CriteriaWithPagination,
} from '!!prop-loader!../../../../../src/components/basic_table/basic_table';
import { Pagination } from '../paginated/_props';
import {
  EuiTableFieldDataColumnType,
  EuiTableComputedColumnType,
  EuiTableActionsColumnType,
  EuiTableSelectionType,
  EuiTableSortingType,
} from '!!prop-loader!../../../../../src/components/basic_table/table_types';
import { CustomItemAction } from '!!prop-loader!../../../../../src/components/basic_table/action_types';
import {
  DefaultItemActionProps as DefaultItemAction,
  SearchProps as Search,
  SearchFilterConfigProps as SearchFilterConfig,
} from '../props/props';
import { FieldValueOptionType } from '!!prop-loader!../../../../../src/components/search_bar/filters/field_value_selection_filter';
import { FieldValueToggleGroupFilterItemType } from '!prop-loader!../../../../../src/components/search_bar/filters/field_value_toggle_group_filter.tsx';

const source = require('!!raw-loader!./in_memory_selection');

export const selectionSection = {
  title: 'In-memory table selection',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <p>
      The following example shows how to use <strong>EuiInMemoryTable</strong>{' '}
      along with item selection. It also shows how you can display messages,
      errors and show loading indication. You can set items to be selected
      initially by passing an array of items as the{' '}
      <EuiCode>initialSelected</EuiCode> value inside{' '}
      <EuiCode>selection</EuiCode> property and passing{' '}
      <EuiCode>itemId</EuiCode> property to enable selection. You can also use
      the <EuiCode>setSelection</EuiCode> method to take complete control over
      table selection. This can be useful if you want to handle selection in
      table based on user interaction with another part of the UI.
    </p>
  ),
  props: {
    EuiInMemoryTable,
    Criteria,
    CriteriaWithPagination,
    Pagination,
    EuiTableSortingType,
    EuiTableSelectionType,
    EuiTableFieldDataColumnType,
    EuiTableComputedColumnType,
    EuiTableActionsColumnType,
    DefaultItemAction,
    CustomItemAction,
    Search,
    SearchFilterConfig,
    FieldValueOptionType,
    FieldValueToggleGroupFilterItemType,
  },
  demo: <Table />,
};
