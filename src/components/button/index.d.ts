/// <reference path="../common.d.ts" />
/// <reference path="../icon/index.d.ts" />

import { SFC, ButtonHTMLAttributes, MouseEventHandler } from 'react';

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
    onClick: MouseEventHandler<HTMLButtonElement>; //overriding DOMAttributes to make this required
    iconType?: IconType;
    iconSide?: ButtonIconSide;
    fill?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    isDisabled?: boolean;
  }

  export const EuiButton: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiButtonProps
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
    onClick: MouseEventHandler<HTMLButtonElement>; //overriding DOMAttributes to make this required
    iconType?: IconType;
    color?: ButtonIconColor;
    isDisabled?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
  }
  export const EuiButtonIcon: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiButtonIconProps
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
    isDisabled?: boolean;
  }

  export const EuiButtonEmpty: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiButtonEmptyProps
  >;
}
