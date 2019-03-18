import { EuiButtonIconProps, EuiButtonPropsForButtonOrLink } from '@elastic/eui';
import { IconType } from '../icon';
import { CommonProps } from '../common';
import { FunctionComponent, ReactNode, ReactPropTypes } from 'react';

declare module '@elastic/eui' {
  /**
   * list group type defs
   *
   * @see './list_group.js'
   */

  type EuiListGroupProps = CommonProps & {
    bordered?: boolean;
    flush?: boolean;
    listItems?: FunctionComponent<EuiListGroupItemProps>[];
    maxWidth?: boolean | number | string;
    showToolTips?: boolean;
    wrapText?: boolean;
  };

  export const EuiListGroup: FunctionComponent<EuiListGroupProps>;

  /**
   * list group item type defs
   *
   * @see './list_group_item.js'
   */

  type EuiListGroupItemProps = CommonProps & {
    size?: 'xs' | 's' | 'm' | 'l';
    label: ReactNode;
    isActive?: boolean;
    isDisabled?: boolean;
    href?: string;
    iconType?: IconType;
    icon?: ReactPropTypes['element'];
    showToolTip?: boolean;
    extraAction?: EuiButtonPropsForButtonOrLink<
      CommonProps &
        EuiButtonIconProps & {
          iconType: IconType;
          alwaysShow?: boolean;
        }
    >;
    onClick?(): void;
    wrapText?: boolean;
  };

  export const EuiListGroupItem: FunctionComponent<EuiListGroupItemProps>;
}
