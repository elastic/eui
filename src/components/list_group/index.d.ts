import { CommonProps } from '../common';
import { FunctionComponent } from 'react';

declare module '@elastic/eui' {
  /**
   * list group type defs
   *
   * @see './list_group.js'
   */

  type EuiListGroupProps = CommonProps & {

  };

  export const EuiListGroup: FunctionComponent<EuiListGroupProps>;
}
