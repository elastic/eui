import React, { useState } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperDatePicker,
  EuiSuperUpdateButton,
} from '../../../../src';

// @ts-ignore to convert
import { GlobalFilterBar } from './global_filter_bar';

import QueryBarFilterButton from './query_bar_filter_menu';
import GlobalFilterAdd from './global_filter_add';
import QueryBarInput from './query_bar_input';

export default () => {
  const [hideDatepicker, setHide] = useState(false);
  const filters = [
    {
      id: 'filter0',
      field: '@tags.keyword',
      operator: 'IS',
      value: 'value',
      isDisabled: false,
      isPinned: true,
      isExcluded: false,
    },
    {
      id: 'filter1',
      field:
        'Filter with a very long title to test if the badge will properly get truncated in the separate set of filter badges that are not quite as long but man does it really need to be long',
      operator: 'IS',
      value: 'value',
      isDisabled: true,
      isPinned: false,
      isExcluded: false,
    },
    {
      id: 'filter2',
      field: '@tags.keyword',
      operator: 'IS NOT',
      value: 'value',
      isDisabled: false,
      isPinned: true,
      isExcluded: true,
    },
    {
      id: 'filter3',
      field: '@tags.keyword',
      operator: 'IS',
      value: 'value',
      isDisabled: false,
      isPinned: false,
      isExcluded: false,
    },
  ];

  const onFieldFocus = () => {
    setHide(true);
  };

  const onFieldBlur = () => {
    setHide(false);
  };

  const onTimeChange = (dateRange: any) => {
    console.log(dateRange);
  };

  return (
    <div className="savedQueriesInput">
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiButton iconType={'arrowDown'} iconSide="right">
            Data view selector
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem grow={false}>
              <QueryBarFilterButton />
            </EuiFlexItem>
            <EuiFlexItem>
              <QueryBarInput onFocus={onFieldFocus} onBlur={onFieldBlur} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <GlobalFilterAdd />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="savedQueriesInput__datepicker">
          <EuiSuperDatePicker
            width="auto"
            isQuickSelectOnly={hideDatepicker}
            onTimeChange={onTimeChange}
            showUpdateButton={false}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSuperUpdateButton onClick={onTimeChange} iconOnly />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup
        className="globalFilterGroup"
        gutterSize="none"
        alignItems="flexStart"
        responsive={false}
      >
        <EuiFlexItem className="globalFilterGroup__filterFlexItem">
          <GlobalFilterBar
            className="globalFilterGroup__filterBar"
            filters={filters}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
