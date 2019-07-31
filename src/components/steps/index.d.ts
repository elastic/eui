import { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps, Omit } from '../common';
import { EuiStepProps } from './step';
import { EuiStepHorizontalProps } from './step_horizontal';

declare module '@elastic/eui' {
  export type EuiStepStatus =
    | 'complete'
    | 'incomplete'
    | 'warning'
    | 'danger'
    | 'disabled';

  type StandaloneEuiStepProps = CommonProps &
    HTMLAttributes<HTMLDivElement> &
    EuiStepProps;

  /**
   * @see './steps.js'
   */

  export type EuiContainedStepProps = Omit<StandaloneEuiStepProps, 'step'>;

  export interface EuiStepsProps {
    firstStepNumber?: number;
    headingElement?: string;
    steps: EuiContainedStepProps[];
  }

  export const EuiSteps: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsProps
  >;

  /**
   * @see './steps_horizontal.js'
   */

  type ContainedEuiStepHorizontalProps = Omit<EuiStepHorizontalProps, 'step'>;

  export interface EuiStepsHorizontalProps {
    steps: ContainedEuiStepHorizontalProps[];
  }

  export const EuiStepsHorizontal: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsHorizontalProps
  >;
}
