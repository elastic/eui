import {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CommonProps, Omit } from '../common';
import { EuiStepProps } from './step';

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
   * @see './sub_steps.js'
   */

  export interface EuiSubStepsProps {}

  export const EuiSubSteps: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiSubStepsProps
  >;

  /**
   * @see './steps_horizontal.js'
   */

  // EuiStepHorizontal is not exported by EUI
  type EuiStepHorizontalProp = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      isSelected?: boolean;
      isComplete?: boolean;
      onClick: MouseEventHandler<HTMLDivElement>; // required
      step: number;
      title: ReactNode;
      disabled?: boolean;
      status?: EuiStepStatus;
    };

  type ContainedEuiStepHorizontalProps = Omit<EuiStepHorizontalProp, 'step'>;

  export interface EuiStepsHorizontalProps {
    steps: ContainedEuiStepHorizontalProps[];
  }

  export const EuiStepsHorizontal: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsHorizontalProps
  >;
}
