/// <reference path="../common.d.ts" />

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {

  /**
   * EuiHorizontalRule type defs
   *
   * @see './horizontal_rule.js'
   */

  export type EuiHorizontalRuleSize = 'full' | 'half' | 'quarter';

  export type EuiHorizontalRuleMargin = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  export interface EuiHorizontalRuleProps {
    size?: EuiHorizontalRuleSize;
    margin?: EuiHorizontalRuleMargin;
  }

  export const EuiHorizontalRule: SFC<
    CommonProps & HTMLAttributes<HTMLHRElement> & EuiHorizontalRuleProps
    >;

}
