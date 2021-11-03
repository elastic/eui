/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, OlHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { EuiStepHorizontal, EuiStepHorizontalProps } from './step_horizontal';

export interface EuiStepsHorizontalProps
  extends OlHTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * An array of `EuiStepHorizontal` objects excluding the `step` prop
   */
  steps: Array<Omit<EuiStepHorizontalProps, 'step'>>;
}

export const EuiStepsHorizontal: FunctionComponent<EuiStepsHorizontalProps> = ({
  className,
  steps,
  ...rest
}) => {
  const classes = classNames('euiStepsHorizontal', className);

  return (
    <ol className={classes} {...rest}>
      {steps.map((stepProps, index) => {
        const isCurrent =
          stepProps.isSelected || stepProps.status === 'current'
            ? { 'aria-current': 'step' as const }
            : {};

        return (
          <li key={index} className="euiStepHorizontal__item" {...isCurrent}>
            <EuiStepHorizontal step={index + 1} {...stepProps} />
          </li>
        );
      })}
    </ol>
  );
};
