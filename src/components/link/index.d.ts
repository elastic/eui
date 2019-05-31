import { CommonProps, Omit } from '../common';

import {
  FunctionComponent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';

declare module '@elastic/eui' {
  /**
   * link type defs
   *
   * @see './link.js'
   */

  export type EuiLinkType = 'button' | 'reset' | 'submit';
  export type EuiLinkColor =
    | 'primary'
    | 'subdued'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'text'
    | 'ghost';

  export interface LinkButtonProps {
    type?: EuiLinkType;
    color?: EuiLinkColor;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }

  type EuiLinkButtonProps = CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    LinkButtonProps;

  export interface LinkAnchorProps {
    type?: EuiLinkType;
    color?: EuiLinkColor;
  }

  type EuiLinkAnchorProps = CommonProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> &
    LinkAnchorProps;

  export const EuiLink: FunctionComponent<
    EuiLinkButtonProps | EuiLinkAnchorProps
  >;
}
