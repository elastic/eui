import { CommonProps, Omit } from '../common';
import { IconColor, IconType } from '../icon';
import { EuiTitleSize } from '../title/title';

import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

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

  export const EuiEmptyPrompt: FunctionComponent<
    CommonProps & EuiEmptyPromptProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>
  >;


}
