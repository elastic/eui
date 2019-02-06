import { CommonProps, RefCallback } from '../common';

import { HTMLAttributes, SFC } from 'react';

declare module '@elastic/eui' {
  /**
   * panel type defs
   *
   * @see './panel.js'
   */

  export type PanelPaddingSize = 'none' | 's' | 'm' | 'l';

  export interface EuiPanelProps {
    hasShadow?: boolean;
    paddingSize?: PanelPaddingSize;
    grow?: boolean;
    panelRef?: RefCallback<HTMLDivElement>;
  }

  export const EuiPanel: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPanelProps
  >;
}
