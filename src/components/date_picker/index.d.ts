import React from 'react';
import { CommonProps } from '../common';
import { IconType } from '../icon';
import _ReactDatePicker, {
  ReactDatePickerProps as _ReactDatePickerProps,
} from './react-datepicker'; // eslint-disable-line import/no-unresolved
import { Moment } from 'moment'; // eslint-disable-line import/named

declare module '@elastic/eui' {
  interface OnTimeChangeProps {
    start: string;
    end: string;
    isInvalid: boolean;
    isQuickSelection: boolean;
  }

  interface OnRefreshProps {
    start: string;
    end: string;
    refreshInterval: number;
  }

  interface OnRefreshChangeProps {
    isPaused: boolean;
    refreshInterval: number;
  }

  interface EuiExtendedDatePickerProps extends _ReactDatePickerProps {
    fullWidth?: boolean;
    isInvalid?: boolean;
    isLoading?: boolean;
    injectTimes?: Moment[]; // added here because the type is missing in @types/react-datepicker@1.8.0
    inputRef?: React.Ref<typeof _ReactDatePicker>;
    placeholder?: string;
    shadow?: boolean;
    showIcon?: boolean;
  }

  export type EuiDatePickerProps = CommonProps & EuiExtendedDatePickerProps;
  export const EuiDatePicker: React.SFC<EuiDatePickerProps>;

  export type EuiDatePickerRangeProps = CommonProps & {
    startDateControl: React.ReactElement<EuiDatePickerProps>;
    endDateControl: React.ReactElement<EuiDatePickerProps>;
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
    isLoading?: boolean;
    start?: string;
    end?: string;
    isPaused?: boolean;
    refreshInterval?: number;
    onTimeChange: (props: OnTimeChangeProps) => void;
    onRefresh?: (props: OnRefreshProps) => void;
    onRefreshChange?: (props: OnRefreshChangeProps) => void;
    commonlyUsedRanges?: EuiSuperDatePickerCommonRange[];
    dateFormat?: string;
    recentlyUsedRanges?: EuiSuperDatePickerRecentRange[];
    showUpdateButton?: boolean;
    isAutoRefreshOnly?: boolean;
    customQuickSelectPanels?: EuiSuperDatePickerQuickSelectPanel[];
  };

  export const EuiSuperDatePicker: React.SFC<EuiSuperDatePickerProps>;

  export const ReactDatePicker: typeof _ReactDatePicker;
  export const ReactDatePickerProps: _ReactDatePickerProps;

  interface DurationRange {
    start: string;
    end: string;
    label: string;
  }

  export const commonDurationRanges: DurationRange[];

  export function prettyDuration(
    timeFrom: string,
    timeTo: string,
    quickRanges: DurationRange[],
    dateFormat: string
  ): string;
}
