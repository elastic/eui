/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {

  import { DOMAttributes, SFC } from 'react';


  /**
   * panel type defs
   *
   * @see './panel.js'
   */

  export type PanelPaddingSize = 'none' | 's' | 'm' | 'l';

  export type PanelRefCallback = (panel: HTMLDivElement) => void;

  export interface EuiPanelProps {
    hasShadow?: boolean,
    paddingSize?: PanelPaddingSize,
    grow?: boolean,
    panelRef?: RefCallback<HTMLDivElement>
  }

  export type EuiPanel = SFC<
    CommonProps &
    Omit<DOMAttributes<HTMLDivElement>, 'ref'> &
    EuiPanelProps
    >;

}
