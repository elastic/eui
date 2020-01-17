import { CommonProps } from '../common';
/// <reference path="./super_select/index.d.ts" />

import { FunctionComponent, FormHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form.js'
   */
  export type EuiFormProps = CommonProps &
    FormHTMLAttributes<HTMLFormElement> & {
      isInvalid?: boolean;
      error?: ReactNode | ReactNode[];
    };

  export const EuiForm: FunctionComponent<EuiFormProps>;
}
