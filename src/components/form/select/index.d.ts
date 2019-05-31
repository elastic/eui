import { CommonProps } from '../../common';

import {
  FunctionComponent,
  ReactNode,
  Ref,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

declare module '@elastic/eui' {
  /**
   * @see './select.js'
   */

  export type EuiSelectProps = CommonProps &
    SelectHTMLAttributes<HTMLSelectElement> & {
      name?: string;
      id?: string;
      options: Array<
        { text: ReactNode } & OptionHTMLAttributes<HTMLOptionElement>
      >;
      isInvalid?: boolean;
      fullWidth?: boolean;
      isLoading?: boolean;
      hasNoInitialSelection?: boolean;
      inputRef?: Ref<HTMLSelectElement>;
      compressed?: boolean;
      prepend?: ReactNode | ReactNode[];
      append?: ReactNode | ReactNode[];
    };

  export const EuiSelect: FunctionComponent<EuiSelectProps>;
}
