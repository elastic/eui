/// <reference path="../common.d.ts" />
/// <reference path="../icon/index.d.ts" />

import { SFC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

declare module '@elastic/eui' {
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
  }
  export const EuiButton: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement> & EuiButtonProps
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
  }
  export const EuiButtonIcon: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement> & EuiButtonIconProps
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
  }

  export const EuiButtonEmpty: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement> & EuiButtonEmptyProps
  >;
}
