/// <reference path="../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * EuiOverlayMask type defs
   *
   * @see './overlay_mask.js'
   */
  export interface EuiOverlayMaskProps {
    className?: string,
    children?: ReactNode,
    onClick?: () => void;
  }

  export const EuiOverlayMask: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiOverlayMaskProps
    >;

}
