import { CommonProps } from '../common';
import { IconType, IconSize } from '../icon';
/// <reference path="../button/index.d.ts" />

import { Component, FunctionComponent, ButtonHTMLAttributes, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * Filter button type defs
   *
   * @see './filter_button.js'
   */

  export interface EuiFilterButtonProps {
    numFilters?: number;
    numActiveFilters?: number;
    isSelected?: boolean;
    isDisabled?: boolean;
    type?: string;
    grow?: boolean;
    noDivider?: boolean;
  }
  export const EuiFilterButton: FunctionComponent<EuiButtonEmptyProps & EuiFilterButtonProps>;

  /**
   * Filter group type defs
   *
   * @see './filter_group.js'
   */

  export const EuiFilterGroup: FunctionComponent<CommonProps & HTMLAttributes<HTMLDivElement>>;

  /**
   * Filter select item type defs
   *
   * @see './filter_select_item.js'
   */

  export type FilterChecked = 'on' | 'off';
  export interface EuiFilterSelectItemProps {
    checked?: FilterChecked;
  }

  export const EuiFilterSelectItem: Component<CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & EuiFilterSelectItemProps>;
}
