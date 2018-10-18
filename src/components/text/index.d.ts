/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { SFC, HTMLAttributes } from 'react';

  /**
   * text type defs
   *
   * @see './text.js'
   * @see './text_color.js'
   */
  type SIZES = 's' | 'xs';

  type COLORS =
    | 'default'
    | 'subdued'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'ghost';

  type EuiTextProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      size?: SIZES;
      color?: COLORS;
      grow?: boolean;
    };

  type EuiTextColorProps = CommonProps &
    HTMLAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLSpanElement> & {
    color?: COLORS;
  };

  export const EuiText: SFC<EuiTextProps>;
  export const EuiTextColor: SFC<EuiTextColorProps>;
}
