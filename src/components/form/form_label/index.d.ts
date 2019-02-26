import { CommonProps } from '../../common';

import { FunctionComponent, ReactNode, LabelHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form_label.js'
   */

  export type EuiFormLabelProps = CommonProps &
    LabelHTMLAttributes<HTMLLabelElement> & {
      isFocused?: boolean;
      isInvalid?: boolean;
    };

  export const EuiFormLabel: FunctionComponent<EuiFormLabelProps>;
}
