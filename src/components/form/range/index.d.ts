import { CommonProps, Omit } from '../../common';

import { ReactNode, FunctionComponent, InputHTMLAttributes } from 'react';

import { EuiRangeHighlightProps } from './range_highlight';
import { EuiRangeLabelProps } from './range_label';
import { EuiRangeLevelsProps, EuiRangeLevel } from './range_levels';
import { EuiRangeSliderProps } from './range_slider';
import { EuiRangeThumbProps } from './range_thumb';
import { EuiRangeTicksProps } from './range_ticks';
import { EuiRangeTooltipProps } from './range_tooltip';
import { EuiRangeTrackProps } from './range_track';
import { EuiRangeWrapperProps } from './range_wrapper';

declare module '@elastic/eui' {
  export type EuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

  export const EuiRangeHighlight: FunctionComponent<EuiRangeHighlightProps>;
  export const EuiRangeLabel: FunctionComponent<EuiRangeLabelProps>;
  export const EuiRangeLevels: FunctionComponent<EuiRangeLevelsProps>;
  export const EuiRangeSlider: FunctionComponent<EuiRangeSliderProps>;
  export const EuiRangeThumb: FunctionComponent<EuiRangeThumbProps>;
  export const EuiRangeTicks: FunctionComponent<EuiRangeTicksProps>;
  export const EuiRangeTooltip: FunctionComponent<EuiRangeTooltipProps>;
  export const EuiRangeTrack: FunctionComponent<EuiRangeTrackProps>;
  export const EuiRangeWrapper: FunctionComponent<EuiRangeWrapperProps>;

  /**
   * single range type def
   *
   * @see './range.js'
   */

  export interface EuiRangeProps {
    compressed?: boolean;
    fullWidth?: boolean;
    id?: string;
    levels?: EuiRangeLevel[];
    // `min` and `max` are optional in HTML but required for our component,
    // so we override them.
    max: number;
    min: number;
    // The spec allows string values for `step` but the component requires
    // a number.
    step?: number;
    showInput?: boolean;
    showLabels?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    showValue?: boolean;
    tickInterval?: number;
    valueAppend?: ReactNode;
    valuePrepend?: ReactNode;

    onChange?: (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLButtonElement>,
      isValid: boolean
    ) => void;
  }

  export const EuiRange: FunctionComponent<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiRangeProps
  >;

  /**
   * dual range type defs
   *
   * @see './dual_range.js'
   */

  export interface EuiDualRangeProps {
    // Override acceptable value type
    value: [number | string, number | string];
  }

  export const EuiDualRange: FunctionComponent<
    CommonProps &
      Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
      EuiRangeProps &
      EuiDualRangeProps
  >;
}
