import { CommonProps } from '../../common';

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form_row.js'
   */

  export type EuiFormRowProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      error?: ReactNode | ReactNode[];
      fullWidth?: boolean;
      hasEmptyLabelSpace?: boolean;
      helpText?: ReactNode;
      isInvalid?: boolean;
      label?: ReactNode;
      describedByIds?: string[];
      compressed?: boolean;
      displayOnly?: boolean;
    };

  export const EuiFormRow: SFC<EuiFormRowProps>;
}
