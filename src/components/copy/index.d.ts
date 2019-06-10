import { SFC } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  /**
   * A function that returns a DOM node.
   */
  export interface EuiCopyElement {
    (): HTMLElement;
  }
  /**
   * EuiCopy type defs
   *
   * @see './copy.js'
   */
  interface EuiCopyProps {
    children: EuiCopyElement;
    textToCopy: string;
    afterMessage: string;
  }

  export const EuiCopy: SFC<CommonProps & EuiCopyProps>;
}
