import { CommonProps, ExclusiveUnion } from '../../common';

import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './form_row.js'
   */
  export type EuiFormRowCommonProps = CommonProps & {
    error?: ReactNode | ReactNode[];
    fullWidth?: boolean;
    hasEmptyLabelSpace?: boolean;
    helpText?: ReactNode;
    isInvalid?: boolean;
    label?: ReactNode;
    labelAppend?: ReactNode;
    describedByIds?: string[];
    compressed?: boolean;
    displayOnly?: boolean;
  };

  type LabelProps = {
    labelType?: 'label';
  } & EuiFormRowCommonProps &
    HTMLAttributes<HTMLDivElement>;

  type LegendProps = {
    labelType?: 'legend';
  } & EuiFormRowCommonProps &
    HTMLAttributes<HTMLFieldSetElement>;

  export type EuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

  export const EuiFormRow: FunctionComponent<EuiFormRowProps>;
}
