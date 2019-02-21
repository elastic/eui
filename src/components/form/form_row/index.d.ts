import { CommonProps } from '../../common';

import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

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
    };

  export const EuiFormRow: FunctionComponent<EuiFormRowProps>;
}
