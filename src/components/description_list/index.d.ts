import { HTMLAttributes, Component, ReactNode } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  export type EuiDescriptionListType = 'row' | 'column' | 'inline';
  export type EuiDescriptionListAlignment = 'center' | 'left';
  export type EuiDescriptionListTextStyle = 'normal' | 'reverse';

  export interface EuiDescriptionListProps {
    listItems?: Array<{ title: ReactNode, description: ReactNode }>;
    align?: EuiDescriptionListAlignment;
    compressed?: boolean;
    textStyle?: EuiDescriptionListTextStyle;
    type?: EuiDescriptionListType;
    titleProps?: HTMLAttributes<HTMLElement>;
    descriptionProps?: object;
  }

  export class EuiDescriptionList extends Component<
    CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps
    > {}

  export interface EuiDescriptionListTitleProps {}

  export class EuiDescriptionListTitle extends Component<
    CommonProps & HTMLAttributes<HTMLElement> & EuiDescriptionListTitleProps
    > {}

  export interface EuiDescriptionListDescriptionProps {}

  export class EuiDescriptionListDescription extends Component<
    CommonProps & HTMLAttributes<HTMLElement> & EuiDescriptionListDescriptionProps
    > {}
}
