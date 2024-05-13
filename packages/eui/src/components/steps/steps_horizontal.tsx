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
import { euiStepsHorizontalStyles } from './steps_horizontal.styles';

export const SIZES = ['s', 'm'] as const;
export type EuiStepsHorizontalSizes = (typeof SIZES)[number];

export interface EuiStepsHorizontalProps
  extends OlHTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * An array of `EuiStepHorizontal` objects excluding the `step` prop
   */
  steps: Array<Omit<EuiStepHorizontalProps, 'step'>>;
  size?: EuiStepsHorizontalSizes;
}

export const EuiStepsHorizontal: FunctionComponent<EuiStepsHorizontalProps> = ({
  className,
  steps,
  size = 'm',
  ...rest
}) => {
  const classes = classNames('euiStepsHorizontal', className);
  const styles = euiStepsHorizontalStyles();
  const cssStyles = styles.euiStepsHorizontal;
  const cssItemStyles = styles.euiStepsHorizontal__item;

  return (
    <ol className={classes} css={cssStyles} {...rest}>
      {steps.map((stepProps, index) => {
        return (
          <li
            key={index}
            className="euiStepsHorizontal__item"
            css={cssItemStyles}
            aria-current={stepProps.status === 'current' ? 'step' : undefined}
          >
            <EuiStepHorizontal step={index + 1} size={size} {...stepProps} />
          </li>
        );
      })}
    </ol>
  );
};
