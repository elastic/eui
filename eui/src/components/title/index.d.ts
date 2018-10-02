/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { SFC } from 'react';

  /**
   * title type defs
   *
   * @see './title.js'
   */

  type EuiTitleSize = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l';

  type EuiTitleTextTransform = 'uppercase';

  type EuiTitleProps = CommonProps & {
    size?: EuiTitleSize;
    textTransform?: EuiTitleTextTransform;
  };

  export const EuiTitle: SFC<EuiTitleProps>;
}
