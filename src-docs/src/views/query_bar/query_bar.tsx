import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiSuperUpdateButton,
  EuiSwitch,
  useGetCurrentBreakpoint,
  useResizeObserver,
} from '../../../../src';

// @ts-ignore to convert
import { GlobalFilterBar } from './global_filter_bar';

import QueryBarFilterButton from './query_bar_filter_menu';
import GlobalFilterAdd from './global_filter_add';
import QueryBarInput from './query_bar_input';
import { DataViewSelector } from './global_data_view';

const MAX_WIDTH_DATA_VIEW = 260;

export default () => {
  const [showAutoRefreshOnly, setShowAutoRefreshOnly] = useState(false);

  const [showDataViewPicker, setShowDataViewPicker] = useState(true);
  const [showQueryBar, setShowQueryBar] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showFilterBar, setShowFilterBar] = useState(true);

  // Responsive helpers
  const [resizeRef, setResizeRef] = useState<HTMLElement | null>(null);
  const dimensions = useResizeObserver(resizeRef);
  const currentBreakpoint = useGetCurrentBreakpoint(true, dimensions.width);
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 's';
  const isLargePlus = currentBreakpoint === 'l' || currentBreakpoint === 'xl';

  const [hideDatepicker, setHideDatepicker] = useState(false);

  const onShowAutoRefreshOnly = (
    checked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setShowAutoRefreshOnly(checked);
    setShowDataViewPicker(!checked);
    setShowQueryBar(!checked);
    setShowFilterBar(!checked);
  };

  const onFieldFocus = () => {
    setHideDatepicker(true);
  };

  const onFieldBlur = () => {
    setHideDatepicker(false);
  };

  const onTimeChange = (dateRange: any) => {
    console.log(dateRange);
  };

  const superUpdateButton = (
    <EuiFlexItem grow={false}>
      <EuiSuperUpdateButton onClick={onTimeChange} iconOnly />
    </EuiFlexItem>
  );

  const dataViewSelector = showDataViewPicker && (
    <EuiFlexItem
      style={{ maxWidth: isMobile ? '100%' : MAX_WIDTH_DATA_VIEW }}
      grow={isMobile}
    >
      <DataViewSelector />
    </EuiFlexItem>
  );

  const queryBar = showQueryBar && (
    <EuiFlexItem style={{ minWidth: 'min(400px, 100%)' }}>
      <EuiFlexGroup gutterSize="s" responsive={false}>
        <EuiFlexItem grow={false}>
          <QueryBarFilterButton />
        </EuiFlexItem>
        <EuiFlexItem>
          <QueryBarInput onFocus={onFieldFocus} onBlur={onFieldBlur} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <GlobalFilterAdd />
        </EuiFlexItem>
        {!showDatePicker && superUpdateButton}
      </EuiFlexGroup>
    </EuiFlexItem>
  );

  const datePicker = showDatePicker && showQueryBar && (
    <EuiFlexItem grow={false}>
      <EuiFlexGroup responsive={false} gutterSize="s">
        <EuiFlexItem
          grow={isMobile}
          style={{
            maxWidth: '100%',
          }}
        >
          <EuiSuperDatePicker
            width={isMobile ? 'full' : 'auto'}
            isQuickSelectOnly={isLargePlus && hideDatepicker}
            onTimeChange={onTimeChange}
            showUpdateButton={false}
          />
        </EuiFlexItem>
        {superUpdateButton}
      </EuiFlexGroup>
    </EuiFlexItem>
  );

  const filterBar = (
    <GlobalFilterBar
      timeBadge={
        !showQueryBar && showDatePicker ? (
          <EuiSuperDatePicker
            width={'auto'}
            onTimeChange={onTimeChange}
            showUpdateButton={false}
            compressed
          />
        ) : undefined
      }
      filterMenu={
        !showQueryBar ? (
          <QueryBarFilterButton buttonProps={{ size: 's' }} />
        ) : undefined
      }
    />
  );

  return (
    <div>
      <EuiPanel>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSwitch
              label="autoRefreshOnly"
              checked={showAutoRefreshOnly}
              onChange={(e) => onShowAutoRefreshOnly(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="showQueryBar"
              checked={showQueryBar}
              disabled={showAutoRefreshOnly}
              onChange={(e) => setShowQueryBar(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="showFilterBar"
              checked={showFilterBar}
              disabled={showAutoRefreshOnly}
              onChange={(e) => onShowAutoRefreshOnly(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="Date picker"
              checked={showDatePicker}
              disabled={showAutoRefreshOnly}
              onChange={(e) => setShowDatePicker(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="Data view picker"
              checked={showDataViewPicker}
              disabled={showAutoRefreshOnly}
              onChange={(e) => setShowDataViewPicker(e.target.checked)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>

      <EuiSpacer />

      <EuiFlexGroup
        direction={isMobile ? 'column' : 'row'}
        responsive={false}
        gutterSize="s"
        justifyContent="flexEnd"
        ref={setResizeRef}
        wrap
      >
        {dataViewSelector}
        {queryBar}
        {datePicker}
      </EuiFlexGroup>

      {showFilterBar && <EuiSpacer size="s" />}
      {filterBar}
    </div>
  );
};
