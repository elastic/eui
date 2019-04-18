import { HTMLAttributes, Component, ReactNode } from 'react';

import { CommonProps } from '../common';

declare module '@elastic/eui' {
  export type EuiAccordionSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

  export interface EuiAccordionProps {
    id: string;
    buttonContentClassName?: string;
    buttonContent?: ReactNode;
    extraAction?: ReactNode;
    initialIsOpen?: boolean;
    paddingSize?: EuiAccordionSize;
  }

  export class EuiAccordion extends Component<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiAccordionProps
    > {}
}
