import { CommonProps, Omit } from '../common';
import { IconType, IconSize } from '../icon'
import { ToggleType } from '../toggle'

import { FunctionComponent, ButtonHTMLAttributes, AnchorHTMLAttributes, ChangeEventHandler, MouseEventHandler, HTMLAttributes } from 'react';

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
    | 'ghost'
    | 'text';
  export type ButtonSize = 's' | 'm' | 'l';

  export interface EuiButtonProps {
    iconType?: IconType;
    iconSide?: ButtonIconSide;
    fill?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    isLoading?: boolean;
    isDisabled?: boolean;
    fullWidth?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }
  export const EuiButton: FunctionComponent<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonProps>
  >;

  /**
   * button icon type defs
   *
   * @see './button_icon/button_icon.js'
   */

  export type ButtonIconColor =
    | 'danger'
    | 'disabled'
    | 'ghost'
    | 'primary'
    | 'subdued'
    | 'success'
    | 'text'
    | 'warning';

  export interface EuiButtonIconProps {
    iconType?: IconType;
    color?: ButtonIconColor;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    isDisabled?: boolean;
    size?: ButtonSize;
    iconSize?: IconSize
  }
  export const EuiButtonIcon: FunctionComponent<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonIconProps>
  >;

  /**
   * empty button type defs
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

  export type EuiButtonEmptyProps = EuiButtonPropsForButtonOrLink<CommonProps & {
    iconType?: IconType;
    iconSide?: EmptyButtonIconSide;
    color?: EmptyButtonColor;
    size?: EmptyButtonSizes;
    flush?: EmptyButtonFlush;
    isLoading?: boolean;
    isDisabled?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }>

  export const EuiButtonEmpty: FunctionComponent<EuiButtonEmptyProps>;

  /**
   * button toggle type defs
   *
   * @see './button_toggle/button_toggle.js'
   */

  export type EuiButtonToggleProps = EuiButtonProps & {
      isEmpty?: boolean;
      isIconOnly?: boolean;
      isSelected?: boolean;
      label: string;
      toggleClassName?: string;
      type?: ToggleType;
    }

  export const EuiButtonToggle: FunctionComponent<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonToggleProps>
  >;

  /**
   * button group type defs
   *
   * @see './button_group/button_group.js'
   */

  export type EuiButtonGroupIdToSelectedMap = { [id: string]: boolean };
  export type GroupButtonSize = 's' | 'm';

  export interface EuiButtonGroupOption {
    id: string,
    label: string,
    isDisabled?: boolean,
  }
  export interface EuiButtonGroupProps {
      options: EuiButtonGroupOption[],
      onChange: (id: string, value: any) => void;
      buttonSize?: GroupButtonSize;
      isDisabled?: boolean,
      isFullWidth?: boolean;
      isIconOnly?: boolean;
      idSelected?: string;
      idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
      legend?: string,
      color?: ButtonColor,
      type?: ToggleType,
      name?: string;
    }

  export const EuiButtonGroup: FunctionComponent<
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & EuiButtonGroupProps
  >;
}
