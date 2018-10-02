/// <reference path="../common.d.ts" />

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * EuiOverlayMask type defs
   *
   * @see './overlay_mask.js'
   */
  export interface EuiOverlayMaskProps {
    onClick?: () => void;
  }

  export const EuiOverlayMask: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiOverlayMaskProps
    >;

}
