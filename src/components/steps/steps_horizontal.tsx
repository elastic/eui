import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps, Omit } from '../common';
import classNames from 'classnames';

import { EuiStepHorizontalProps, EuiStepHorizontal } from './step_horizontal';

type ContainedEuiStepHorizontalProps = Omit<EuiStepHorizontalProps, 'step'>;

export interface EuiStepsHorizontalProps {
  /**
   * An array of `EuiStepHorizontal` objects excluding the `step` prop
   */
  steps: ContainedEuiStepHorizontalProps[];
}

function renderHorizontalSteps(steps: ContainedEuiStepHorizontalProps[]) {
  return steps.map((step, index) => {
    return <EuiStepHorizontal key={index} step={index + 1} {...step} />;
  });
}

export const EuiStepsHorizontal: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsHorizontalProps
> = ({ className, steps, ...rest }) => {
  const classes = classNames('euiStepsHorizontal', className);

  return (
    <div role="tablist" className={classes} {...rest}>
      {renderHorizontalSteps(steps)}
    </div>
  );
};
