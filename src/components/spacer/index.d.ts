/// <reference path="../common.d.ts" />

declare module "@elastic/eui" {

  import { SFC, DOMAttributes } from 'react';

  /**
   * spacer type defs
   *
   * @see './spacer.js'
   */

  export type SpacerSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  export interface EuiSpacerProps {
    size?: SpacerSize
  }

  export type EuiSpacer = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiSpacerProps
    >;
}
