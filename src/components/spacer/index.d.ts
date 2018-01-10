/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { SFC, HTMLAttributes } from 'react';

  /**
   * spacer type defs
   *
   * @see './spacer.js'
   */

  export type SpacerSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  export interface EuiSpacerProps {
    size?: SpacerSize;
  }

  export const EuiSpacer: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiSpacerProps
  >;
}
