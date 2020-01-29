import { CommonProps } from '../common';

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
