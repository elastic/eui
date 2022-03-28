import React, { useState } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiSuperUpdateButton,
  EuiSwitch,
  useEuiTheme,
  useGetCurrentBreakpoint,
  useResizeObserver,
} from '../../../../src';

// @ts-ignore to convert
import { GlobalFilterBar } from './global_filter_bar';

import QueryBarFilterButton from './query_bar_filter_menu';
import GlobalFilterAdd from './global_filter_add';
import QueryBarInput from './query_bar_input';

export default () => {
  const { euiTheme } = useEuiTheme();

  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showDataViewPicker, setShowDataViewPicker] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Responsive helpers
  const [resizeRef, setResizeRef] = useState<HTMLElement | null>(null);
  const dimensions = useResizeObserver(resizeRef);
  const currentBreakpoint = useGetCurrentBreakpoint(true, dimensions.width);
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 's';
  const isMedium = currentBreakpoint === 'm';
  const isLargePlus = currentBreakpoint === 'l' || currentBreakpoint === 'xl';

  // console.log({ currentBreakpoint, isMobile, resizeRef });

  const [hideDatepicker, setHideDatepicker] = useState(false);

  const onFieldFocus = () => {
    setHideDatepicker(true);
  };

  const onFieldBlur = () => {
    setHideDatepicker(false);
  };

  const onTimeChange = (dateRange: any) => {
    console.log(dateRange);
  };

  const shouldStack =
    currentBreakpoint === 'xs' || (isMobile && !showDatePicker);

  const dataViewSelector = showDataViewPicker && (
    <EuiFlexItem
      grow={shouldStack}
      style={{
        maxWidth: shouldStack ? '100%' : 260,
      }}
    >
      <EuiButton iconType={'arrowDown'} iconSide="right" fullWidth>
        Data view selector with a really long name to make sure it truncates
      </EuiButton>
    </EuiFlexItem>
  );

  const superUpdateButton = (
    <EuiFlexItem grow={false}>
      <EuiSuperUpdateButton onClick={onTimeChange} iconOnly />
    </EuiFlexItem>
  );

  const superDatePicker = (
    <EuiFlexItem grow={isMobile || isMedium}>
      <EuiSuperDatePicker
        width={currentBreakpoint === 'xs' ? 'full' : 'auto'}
        isQuickSelectOnly={isLargePlus && hideDatepicker}
        onTimeChange={onTimeChange}
        showUpdateButton={false}
      />
    </EuiFlexItem>
  );

  const datePicker = showDatePicker && (
    <EuiFlexItem
      grow={isMobile || isMedium}
      style={{
        minWidth: currentBreakpoint === 'xs' ? '100%' : 'auto',
        maxWidth: '100%',
      }}
    >
      <EuiFlexGroup
        gutterSize="none"
        responsive={false}
        style={{ gap: euiTheme.size.m }}
      >
        {superDatePicker}
        {superUpdateButton}
      </EuiFlexGroup>
    </EuiFlexItem>
  );

  const queryBar = (
    <EuiFlexItem
      style={{
        minWidth: isMobile || (isMedium && showDatePicker) ? '100%' : 'auto',
        maxWidth: '100%',
      }}
    >
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

  const filterBar = (
    <EuiFlexItem
      style={{
        overflow: 'hidden',
        minWidth: isReadOnly && isLargePlus ? 'auto' : '100%',
      }}
    >
      <GlobalFilterBar
        filterMenu={
          isReadOnly ? (
            <QueryBarFilterButton
              buttonProps={isReadOnly ? { size: 's' } : undefined}
            />
          ) : undefined
        }
      />
    </EuiFlexItem>
  );

  let elementOrder;
  switch (currentBreakpoint) {
    case 'xs':
      elementOrder = isReadOnly
        ? [datePicker, filterBar]
        : [dataViewSelector, datePicker, queryBar, filterBar];
      break;
    case 's':
    case 'm':
      elementOrder = isReadOnly
        ? [datePicker, filterBar]
        : [dataViewSelector, datePicker, queryBar, filterBar];
      break;
    default:
      elementOrder = isReadOnly
        ? [filterBar, datePicker]
        : [dataViewSelector, queryBar, datePicker, filterBar];
      break;
  }

  return (
    <div>
      <EuiPanel>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSwitch
              label="Date picker"
              checked={showDatePicker}
              onChange={(e) => setShowDatePicker(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="Data view picker"
              checked={showDataViewPicker}
              onChange={(e) => setShowDataViewPicker(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="Read only"
              checked={isReadOnly}
              onChange={(e) => setIsReadOnly(e.target.checked)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>

      <EuiSpacer />

      <EuiFlexGroup
        gutterSize="none"
        wrap
        responsive={false}
        style={{ gap: euiTheme.size.m }}
        ref={setResizeRef}
      >
        {elementOrder}
      </EuiFlexGroup>
    </div>
  );
};
