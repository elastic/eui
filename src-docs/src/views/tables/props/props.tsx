import React, { FunctionComponent } from 'react';
import { DefaultItemAction } from '../../../../../src/components/basic_table/action_types';
import { Search } from '../../../../../src/components/basic_table/in_memory_table';
import { SearchFilterConfig } from '../../../../../src/components/search_bar/filters';
import { EuiTableRowCellMobileOptionsShape as _EuiTableRowCellMobileOptionsShape } from '../../../../../src/components/table/table_row_cell';

// Simulating the `item` generic
type T = {};

export const DefaultItemActionProps: FunctionComponent<DefaultItemAction<
  T
>> = () => <div />;

export const SearchProps: FunctionComponent<Search> = () => <div />;

export const SearchFilterConfigProps: FunctionComponent<SearchFilterConfig> = () => (
  <div />
);

export const EuiTableRowCellMobileOptionsShape: FunctionComponent<_EuiTableRowCellMobileOptionsShape> = () => (
  <div />
);
