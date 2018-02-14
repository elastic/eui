/// <reference path="../icon/index.d.ts" />

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * health type defs
   *
   * @see './health.js'
   */

  type EuiHealthProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      color: IconColor;
    };

  export const EuiHealth: SFC<EuiHealthProps>;
}
