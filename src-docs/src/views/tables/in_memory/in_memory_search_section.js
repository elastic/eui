import React from 'react';
import { GuideSectionTypes } from '../../../components';

import Table from './in_memory_search';
import { Link } from 'react-router-dom';

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

const source = require('!!raw-loader!./in_memory_search');

export const searchSection = {
  title: 'In-memory table with search',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <div>
      <p>
        The example shows how to configure <strong>EuiInMemoryTable </strong>
        to display a search bar by passing the search prop. You can read more
        about the search bar&apos;s properties and its syntax{' '}
        <Link to="/forms/search-bar">
          <strong>here</strong>
        </Link>{' '}
        .
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
