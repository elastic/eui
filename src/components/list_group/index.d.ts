import {
  EuiButtonIconProps,
  EuiButtonPropsForButtonOrLink,
} from '@elastic/eui'; // eslint-disable-line import/no-unresolved
import { IconType } from '../icon';
import { CommonProps, ExclusiveUnion } from '../common';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

declare module '@elastic/eui' {
  /**
   * list group type defs
   *
   * @see './list_group.js'
   */

  type EuiListGroupProps = CommonProps &
    HTMLAttributes<HTMLUListElement> & {
      bordered?: boolean;
      flush?: boolean;
      listItems?: Array<FunctionComponent<EuiListGroupItemProps>>;
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

  interface EuiListGroupItemPropsBasics {
    size?: 'xs' | 's' | 'm' | 'l';
    label: ReactNode;
    isActive?: boolean;
    isDisabled?: boolean;
    href?: string;
    iconType?: IconType;
    icon?: ReactElement;
    showToolTip?: boolean;
    extraAction?: EuiButtonPropsForButtonOrLink<
      CommonProps &
        EuiButtonIconProps & {
          iconType: IconType;
          alwaysShow?: boolean;
        }
    >;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    wrapText?: boolean;
  }

  type EuiListGroupItemProps = EuiListGroupItemPropsBasics &
    CommonProps &
    ExclusiveUnion<
      ExclusiveUnion<
        ButtonHTMLAttributes<HTMLButtonElement>,
        AnchorHTMLAttributes<HTMLAnchorElement>
      >,
      HTMLAttributes<HTMLSpanElement>
    >;

  export const EuiListGroupItem: FunctionComponent<EuiListGroupItemProps>;
}
