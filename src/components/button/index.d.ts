declare module '@elastic/eui' {

  import { ReactNode } from 'react';

  export type ButtonIconSide = 'left' | 'right';

  export type ButtonColor = 'primary' | 'secondary' | 'warning' | 'danger' | 'ghost';

  export type ButtonSize = 's' | 'l';

  export interface EuiButtonProps {
    onClick: (event: any) => void;
    children?: ReactNode,
    className?: string,
    iconType?: IconType,
    iconSide?: ButtonIconSide,
    fill?: boolean,
    color?: ButtonColor,
    size?: ButtonSize,
    isDisabled?: boolean,
    [key: string]: any
  }
  export class EuiButton extends React.Component<EuiButtonProps, {}> {}


  export type ButtonIconColor = 'primary' | 'danger' | 'disabled' | 'ghost' | 'text';

  export interface EuiButtonIconProps {
    onClick: (event: any) => void;
    children?: ReactNode,
    className?: string,
    iconType?: IconType,
    color?: ButtonIconColor,
    isDisabled?: boolean,
    'aria-label'?: string,
    'aria-labelledby'?: string,
    [key: string]: any
  }
  export class EuiButtonIcon extends React.Component<EuiButtonIconProps, {}> {}


  export type EmptyButtonIconSide = 'left' | 'right';
  export type EmptyButtonColor = 'primary' | 'danger' | 'disabled' | 'text' | 'ghost';
  export type EmptyButtonSizes = 'xs' | 's' | 'l';
  export type EmptyButtonFlush = 'left' | 'right';

  export interface EuiButtonEmptyProps {
    children?: ReactNode,
    className?: string,
    iconType?: IconType,
    iconSide?: EmptyButtonIconSide,
    color?: EmptyButtonColor,
    size?: EmptyButtonSizes,
    flush?: EmptyButtonFlush,
    isDisabled?: boolean
  }
  export class EuiButtonEmpty extends React.Component<EuiButtonEmptyProps, {}>{}
}
