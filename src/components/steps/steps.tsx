import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps, Omit } from '../common';
import classNames from 'classnames';

import { StandaloneEuiStepProps, EuiStep } from './step';

export type EuiContainedStepProps = Omit<StandaloneEuiStepProps, 'step'>;

export interface EuiStepsProps {
  /**
   * An array of `EuiStep` objects excluding the `step` prop
   */
  steps: EuiContainedStepProps[];
  /**
   * The number the steps should begin from
   */
  firstStepNumber?: number;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
}

function renderSteps(
  steps: EuiContainedStepProps[],
  firstStepNumber: number,
  headingElement: string
) {
  return steps.map((step, index) => {
    const { className, children, title, status, ...rest } = step;

    return (
      <EuiStep
        className={className}
        key={index}
        headingElement={headingElement}
        step={firstStepNumber + index}
        title={title}
        status={status}
        {...rest}>
        {children}
      </EuiStep>
    );
  });
}

export const EuiSteps: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsProps
> = ({
  className,
  firstStepNumber = 1,
  headingElement = 'p',
  steps,
  ...rest
}) => {
  const classes = classNames('euiSteps', className);

  return (
    <div className={classes} {...rest}>
      {renderSteps(steps, firstStepNumber, headingElement)}
    </div>
  );
};
