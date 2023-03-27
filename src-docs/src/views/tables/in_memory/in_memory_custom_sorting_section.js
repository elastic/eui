import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';

import Table from './in_memory_custom_sorting';

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

const source = require('!!raw-loader!./in_memory_custom_sorting');

export const customSortingSection = {
  title: 'In-memory table with custom sort values',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <div>
      <p>
        Sometimes the value displayed in a column is not appropriate to use for
        sorting, such as pre-formatting values to be human-readable. In these
        cases it&apos;s possible to pass the <EuiCode>sortable</EuiCode> prop as
        a function instead of <EuiCode>true</EuiCode> or{' '}
        <EuiCode>false</EuiCode>. The function is used to extract or calculate
        the intended sort value for each <EuiCode>item</EuiCode>.
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
