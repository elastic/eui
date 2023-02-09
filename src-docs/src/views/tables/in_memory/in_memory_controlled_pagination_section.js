import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';

import Table from './in_memory_controlled_pagination';

import { EuiInMemoryTable } from '../../../../../src/components/basic_table/in_memory_table';
import {
  Criteria,
  CriteriaWithPagination,
} from '!!prop-loader!../../../../../src/components/basic_table/basic_table';
import { Pagination } from '!!prop-loader!../../../../../src/components/basic_table/pagination_bar';
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

const source = require('!!raw-loader!./in_memory_controlled_pagination');

export const controlledPaginationSection = {
  title: 'In-memory table with controlled pagination',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <div>
      <p>
        By default <EuiCode>EuiInMemoryTable</EuiCode> resets its page index
        when receiving a new <EuiCode>EuiInMemoryTable</EuiCode> array. To avoid
        this behavior the pagination object optionally takes a
        <EuiCode>pageIndex</EuiCode> value to control this yourself.
        Additionally, <EuiCode>pageSize</EuiCode> can also be controlled the
        same way. Both of these are provided to your app during the
        <EuiCode>onTableChange</EuiCode> callback.
      </p>
      <p>
        The example below updates the array of users every second, randomly
        toggling their online status. Pagination state is maintained by the app,
        preventing it from being reset by the updates.
      </p>
    </div>
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
