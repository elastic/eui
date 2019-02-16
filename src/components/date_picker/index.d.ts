import React from 'react';
import { CommonProps } from '../common';
import { Moment } from 'moment';
import { IconType } from '../icon';

declare module '@elastic/eui' {
  interface OnTimeChangeProps {
    start: string;
    end: string;
    isInvalid: boolean;
    isQuickSelection: boolean;
  }

  interface OnRefreshChangeProps {
    isPaused: boolean;
    refreshInterval: number;
  }

  export type EuiDatePickerProps = CommonProps & {
    calendarClassName?: string;
    customInput?: React.ReactNode;
    dateFormat?: string;
    // not sure if this is correct
    dayClassName?: (date: Moment) => string | undefined;
    // not sure if this is correct
    filterDates?: Moment[];
    fullWidth?: boolean;
    // not sure if this is correct
    injectTimes?: Moment[];
    // not sure what this generic value should be?
    inputRef: React.Ref<HTMLInputElement>;
    isInvalid: boolean;
    isLoading: boolean;
    locale: string;
    maxDate: Moment;
    maxTime: Moment;
    minDate: Moment;
    minTime: Moment;
    // pulled from react-datepickeer definitely typed
    // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-datepicker/index.d.ts#L68
    onChange(
      date: Date | null,
      event: React.SyntheticEvent<any> | undefined
    ): void;
    openToDate: Moment;
    placeholder: string;
    popperClassName: string;
    selected: Moment;
    shadow: boolean;
    shouldCloseOnSelect: boolean;
    showIcon: boolean;
    showTimeSelect: boolean;
    showTimeSelectOnly: boolean;
    timeFormat: string;
  };

  export const EuiDatePicker: React.SFC<EuiDatePickerProps>;

  export type EuiDatePickerRangeProps = CommonProps & {
    startDateControl: typeof EuiDatePicker;
    endDateControl: typeof EuiDatePicker;
    iconType: boolean | IconType;
    fullWidth: boolean;
    isCustom: boolean;
  };

  export const EuiDatePickerRange: React.SFC<EuiDatePickerRangeProps>;

  export interface EuiSuperDatePickerCommonRange {
    start: string;
    end: string;
    label: string;
  }

  export interface EuiSuperDatePickerRecentRange {
    start: string;
    end: string;
  }

  export interface EuiSuperDatePickerQuickSelectPanel {
    title: string;
    content: React.ReactNode;
  }

  export type EuiSuperDatePickerProps = CommonProps & {
    start?: string;
    end?: string;
    isPaused?: boolean;
    refreshInterval?: number;
    onTimeChange: (props: OnTimeChangeProps) => void;
    onRefreshChange?: (props: OnRefreshChangeProps) => void;
    commonlyUsedRanges?: EuiSuperDatePickerCommonRange[];
    dateFormat?: string;
    recentlyUsedRanges?: EuiSuperDatePickerRecentRange[];
    showUpdateButton: boolean;
    isAutoRefreshOnly: boolean;
    customQuickSelectPanels: EuiSuperDatePickerQuickSelectPanel[];
  };

  export const EuiSuperDatePicker: React.SFC<EuiSuperDatePickerProps>;
}
