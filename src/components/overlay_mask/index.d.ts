import { CommonProps } from '../common';

import { FunctionComponent, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * EuiOverlayMask type defs
   *
   * @see './overlay_mask.js'
   */
  export interface EuiOverlayMaskProps {
    onClick?: () => void;
  }

  export type Others = CommonProps & HTMLAttributes<HTMLDivElement>;

  export const EuiOverlayMask: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiOverlayMaskProps
  >;
}
