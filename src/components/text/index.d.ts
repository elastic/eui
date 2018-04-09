/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { SFC, HTMLAttributes } from 'react';

  /**
   * text type defs
   *
   * @see './text.js'
   * @see './text_color.js'
   */
  type EuiTextSize = 's' | 'xs';

  type EuiTextColor =
    | 'default'
    | 'subdued'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'ghost';

  type EuiTextProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      size?: EuiTextSize;
      color?: EuiTextColor;
    };

  export const EuiText: SFC<EuiTextProps>;
}
