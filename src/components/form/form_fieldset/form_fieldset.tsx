import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import { EuiFormLegendProps, EuiFormLegend } from './form_legend';

export interface EuiFormFieldsetProps
  extends CommonProps,
    HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Adds an EuiFormLegend element as the first child
   */
  legend?: EuiFormLegendProps;
}

export const EuiFormFieldset: FunctionComponent<EuiFormFieldsetProps> = ({
  children,
  className,
  legend,
  ...rest
}) => {
  const legendDisplay = !!legend && <EuiFormLegend {...legend} />;

  return (
    <fieldset className={className} {...rest}>
      {legendDisplay}
      {children}
    </fieldset>
  );
};
