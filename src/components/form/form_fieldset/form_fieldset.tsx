/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

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
