import { IconColor } from '../icon';

import { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

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

  export const EuiHealth: FunctionComponent<EuiHealthProps>;
}
