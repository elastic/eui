/// <reference path="../common.d.ts" />
/// <reference path="./checkbox/index.d.ts" />
/// <reference path="./field_number/index.d.ts" />
/// <reference path="./field_search/index.d.ts" />
/// <reference path="./field_text/index.d.ts" />
/// <reference path="./form_help_text/index.d.ts" />
/// <reference path="./form_label/index.d.ts" />
/// <reference path="./form_row/index.d.ts" />
/// <reference path="./radio/index.d.ts" />
/// <reference path="./select/index.d.ts" />
/// <reference path="./switch/index.d.ts" />
/// <reference path="./text_area/index.d.ts" />

import { SFC, FormHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form.js'
   */
  export type EuiFormProps = CommonProps &
    FormHTMLAttributes<HTMLFormElement> & {
      isInvalid?: boolean;
      error?: ReactNode | ReactNode[];
    };

  export const EuiForm: SFC<EuiFormProps>;
}
