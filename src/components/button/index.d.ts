import { CommonProps } from '../common';
import { IconType } from '../icon'

import { SFC, ButtonHTMLAttributes, AnchorHTMLAttributes, MouseEventHandler, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  type EuiButtonPropsForButtonOrLink<Props> = (
    (Props & { onClick: MouseEventHandler<HTMLButtonElement> } & ButtonHTMLAttributes<HTMLButtonElement>) |
    (Props & { href: string; onClick: MouseEventHandler<HTMLAnchorElement> } & AnchorHTMLAttributes<HTMLAnchorElement>) |
    (Props & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>)
  )

  /**
   * Normal button type defs
   *
   * @see './button.js'
   */

  export type ButtonIconSide = 'left' | 'right';
  export type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'ghost';
  export type ButtonSize = 's' | 'l';

  export interface EuiButtonProps {
    iconType?: IconType;
    iconSide?: ButtonIconSide;
    fill?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    isLoading?: boolean;
    isDisabled?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }
  export const EuiButton: SFC<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonProps>
  >;

  /**
   * button icon type defs
   *
   * @see './button_icon/button_icon.js'
   */

  export type ButtonIconColor =
    | 'primary'
    | 'danger'
    | 'disabled'
    | 'ghost'
    | 'text';

  export interface EuiButtonIconProps {
    iconType?: IconType;
    color?: ButtonIconColor;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    isDisabled?: boolean;
    size?: ButtonSize;
  }
  export const EuiButtonIcon: SFC<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonIconProps>
  >;

  /**
   * button icon type defs
   *
   * @see './button_empty/button_empty.js'
   */

  export type EmptyButtonIconSide = 'left' | 'right';
  export type EmptyButtonColor =
    | 'primary'
    | 'danger'
    | 'disabled'
    | 'text'
    | 'ghost';
  export type EmptyButtonSizes = 'xs' | 's' | 'l';
  export type EmptyButtonFlush = 'left' | 'right';

  export interface EuiButtonEmptyProps {
    iconType?: IconType;
    iconSide?: EmptyButtonIconSide;
    color?: EmptyButtonColor;
    size?: EmptyButtonSizes;
    flush?: EmptyButtonFlush;
    isLoading?: boolean;
    isDisabled?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }

  export const EuiButtonEmpty: SFC<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonEmptyProps>
  >;
}
