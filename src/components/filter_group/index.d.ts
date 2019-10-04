import { Component, FunctionComponent, ButtonHTMLAttributes } from 'react';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';
import { EuiButtonEmptyProps } from '../button';
import { EuiFilterGroupProps } from './filter_group';

declare module '@elastic/eui' {
  /**
   * Filter button type defs
   *
   * @see './filter_button.js'
   */

  export interface EuiFilterButtonProps extends EuiButtonEmptyProps {
    numFilters?: number;
    numActiveFilters?: number;
    hasActiveFilters?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    grow?: boolean;
    withNext?: boolean;
    /**
     * _DEPRECATED use `withNext`_
     */
    noDivider?: boolean;
  }
  type EuiFilterButtonPropsForAnchor = PropsForAnchor<EuiFilterButtonProps>;

  type EuiFilterButtonPropsForButton = PropsForButton<EuiFilterButtonProps>;

  type Props = ExclusiveUnion<
    EuiFilterButtonPropsForAnchor,
    EuiFilterButtonPropsForButton
  >;
  export const EuiFilterButton: FunctionComponent<Props>;

  /**
   * Filter group type defs
   *
   * @see './filter_group.js'
   */
  export const EuiFilterGroup: FunctionComponent<EuiFilterGroupProps>;

  /**
   * Filter select item type defs
   *
   * @see './filter_select_item.js'
   */

  export type FilterChecked = 'on' | 'off';
  export interface EuiFilterSelectItemProps {
    checked?: FilterChecked;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

  // eslint-disable-next-line react/prefer-stateless-function
  export class EuiFilterSelectItem extends Component<
    CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> &
      EuiFilterSelectItemProps
  > {
    render(): JSX.Element;
  }
}
