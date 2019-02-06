import { CommonProps, Omit } from '../common';
import { IconColor, IconType } from '../icon'
/// <reference path="../title/index.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * EuiEmptyPrompt type defs
   *
   * @see './empty_prompt.js'
   */

  export interface EuiEmptyPromptProps {
    iconType?: IconType;
    iconColor?: IconColor;
    title?: ReactNode;
    titleSize?: EuiTitleSize;
    body?: ReactNode;
    actions?: ReactNode;
  }

  export const EuiEmptyPrompt: SFC<
    CommonProps & EuiEmptyPromptProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>
  >;


}
