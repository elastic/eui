import { CommonProps } from '../common';
import { FunctionComponent } from 'react';

declare module '@elastic/eui' {
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

  export const EuiTitle: FunctionComponent<EuiTitleProps>;
}
