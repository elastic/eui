/// <reference path="../common.d.ts" />

declare module "@elastic/eui" {

  import { SFC, AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler } from 'react';

  /**
   * link type defs
   *
   * @see './link.js'
   */

  export type EuiLinkType = 'button' | 'reset' | 'submit';
  export type EuiLinkColor = 'primary' | 'subdued' | 'secondary' | 'accent' | 'danger' | 'warning' | 'ghost';

  export interface EuiLinkButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    type?: EuiLinkType,
    color?: EuiLinkColor,
    onClick?: MouseEventHandler<HTMLButtonElement>
  }

  type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
  export interface EuiLinkAnchorProps extends CommonProps, AnchorProps {
    type?: EuiLinkType,
    color?: EuiLinkColor
  }

  export type EuiLink = SFC<EuiLinkButtonProps | EuiLinkAnchorProps>;
}
