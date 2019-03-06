import { CommonProps } from '../common';
import { FunctionComponent, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * text type defs
   *
   * @see './text.js'
   * @see './text_color.js'
   */
  type TEXT_SIZES = 'm' | 's' | 'xs';

  /**
   * text alignment options
   *
   * @see './text.js'
   * @see './text_align.js'
   */
  type ALIGNMENTS = 'left' | 'center' | 'right';

  type COLORS =
    | 'default'
    | 'subdued'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'warning'
    | 'ghost';

  type EuiTextAlignProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      textAlign?: ALIGNMENTS;
    };

  type EuiTextProps = EuiTextAlignProps & {
      size?: TEXT_SIZES;
      color?: COLORS;
      grow?: boolean;
    };

  type EuiTextColorProps = CommonProps &
    HTMLAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLSpanElement> & {
    color?: COLORS;
  };



  export const EuiText: FunctionComponent<EuiTextProps>;
  export const EuiTextAlign: FunctionComponent<EuiTextAlignProps>;
  export const EuiTextColor: FunctionComponent<EuiTextColorProps>;
}
