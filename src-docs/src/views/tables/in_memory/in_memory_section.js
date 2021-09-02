import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { EuiCode, EuiCallOut } from '../../../../../src/components';
import { Table } from './in_memory';

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

const source = require('!!raw-loader!./in_memory');
const html = renderToHtml(Table);

export const section = {
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <div>
      <p>
        The <strong>EuiInMemoryTable</strong> is a higher level component
        wrapper around <strong>EuiBasicTable</strong> aimed at displaying tables
        data when all the data is in memory. It takes the full set of data (all
        possible items) and based on its configuration, will display it handling
        all configured functionality (pagination and sorting) for you.
      </p>
      <EuiCallOut
        title="EuiMemoryTable relies on referential equality of a column's name"
        color="warning"
      >
        <p>
          <strong>EuiMemoryTable</strong> relies on referential equality of a
          column&apos;s <EuiCode>name</EuiCode> field when sorting by that
          column. For example, if a JSX element is created for the name every
          render it appears different to the table and prevents sorting.
          Instead, that value needs to be lifted outside of the render method
          and preserved between renders.
        </p>
      </EuiCallOut>
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
