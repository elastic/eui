import { CommonProps } from '../../common';

import { FunctionComponent } from 'react';

declare module '@elastic/eui' {
  /**
   * ResizeObserver type defs
   *
   * @see './resize_observer.js'
   */
  export interface EuiResizeObserverProps {
    onResize: (dimensions: { width: number; height: number }) => void;
  }

  export const EuiResizeObserver: FunctionComponent<
    CommonProps & EuiResizeObserverProps
  >;
}
