import { CommonProps } from '../common';
/// <reference path="./checkbox/index.d.ts" />
/// <reference path="./field_number/index.d.ts" />
/// <reference path="./field_password/index.d.ts" />
/// <reference path="./field_search/index.d.ts" />
/// <reference path="./field_text/index.d.ts" />
/// <reference path="./form_help_text/index.d.ts" />
/// <reference path="./form_control_layout/index.d.ts" />
/// <reference path="./form_row/index.d.ts" />
/// <reference path="./radio/index.d.ts" />
/// <reference path="./range/index.d.ts" />
/// <reference path="./select/index.d.ts" />
/// <reference path="./super_select/index.d.ts" />
/// <reference path="./switch/index.d.ts" />
/// <reference path="./text_area/index.d.ts" />

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
