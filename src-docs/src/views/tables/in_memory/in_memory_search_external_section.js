import React from 'react';
import { GuideSectionTypes } from '../../../components';

import Table from './in_memory_search_external';

import { EuiInMemoryTable } from '../../../../../src/components/basic_table/in_memory_table';
import {
  Criteria,
  CriteriaWithPagination,
} from '!!prop-loader!../../../../../src/components/basic_table/basic_table';
import { Pagination } from '../paginated/_props';
import {
  EuiTableFieldDataColumnType,
  EuiTableSelectionType,
  EuiTableSortingType,
} from '!!prop-loader!../../../../../src/components/basic_table/table_types';
import { CustomItemAction } from '!!prop-loader!../../../../../src/components/basic_table/action_types';
import {
  EuiTableComputedColumnType,
  EuiTableActionsColumnType,
  DefaultItemActionProps as DefaultItemAction,
  SearchProps as Search,
  SearchFilterConfigProps as SearchFilterConfig,
} from '../props/props';
import { FieldValueOptionType } from '!!prop-loader!../../../../../src/components/search_bar/filters/field_value_selection_filter';
import { FieldValueToggleGroupFilterItemType } from '!prop-loader!../../../../../src/components/search_bar/filters/field_value_toggle_group_filter.tsx';

const source = require('!!raw-loader!./in_memory_search_external');

export const searchExternalSection = {
  title: 'In-memory table with search and external state',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <p>
      The example shows how to configure <strong>EuiInMemoryTable</strong> when
      both external and internal search/filter states are in use.
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
