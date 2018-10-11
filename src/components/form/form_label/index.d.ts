/// <reference path="../../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form_label.js'
   */

  export type EuiFormLabelProps = CommonProps &
    HTMLAttributes<HTMLLabelElement> & {
      isFocused?: boolean;
      isInvalid?: boolean;
    };

  export const EuiFormLabel: SFC<EuiFormLabelProps>;
}
