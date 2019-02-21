import React from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

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

  interface EuiExtendedDatePickerProps extends ReactDatePickerProps {
    fullWidth?: boolean;
    isInvalid?: boolean;
    isLoading?: boolean;
    inputRef?: React.Ref<ReactDatePicker>;
    placeholder?: string;
    shadow?: boolean;
    showIcon?: boolean;
  }

  export type EuiDatePickerProps = CommonProps & EuiExtendedDatePickerProps;
  export const EuiDatePicker: React.SFC<EuiDatePickerProps>;

  export type EuiDatePickerRangeProps = CommonProps & {
    startDateControl: typeof EuiDatePicker;
    endDateControl: typeof EuiDatePicker;
    iconType?: boolean | IconType;
    fullWidth?: boolean;
    isCustom?: boolean;
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
    showUpdateButton?: boolean;
    isAutoRefreshOnly?: boolean;
    customQuickSelectPanels?: EuiSuperDatePickerQuickSelectPanel[];
  };

  export const EuiSuperDatePicker: React.SFC<EuiSuperDatePickerProps>;
}
