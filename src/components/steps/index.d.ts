/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { SFC, ReactNode, HTMLAttributes } from 'react';

  export type EuiStepStatus = 'complete' | 'incomplete' | 'warning' | 'danger' | 'disabled'

  /**
   * @see './step.js'
   */

  export interface EuiStepProps {
    children: ReactNode, // required
    status?: EuiStepStatus,
    step: number,
    title: string,
    headingElement?: string,
  }

  export const EuiStep: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepProps
  >;

  /**
   * @see './steps.js'
   */

  export interface EuiStepsProps {
    firstStepNumber?: number,
    headingElement?: string,
    steps: Array<{ title: string, children?: ReactNode }>,
  }

  export const EuiSteps: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsProps
  >;

  /**
   * @see './sub_steps.js'
   */

  export interface EuiSubStepsProps {
  }

  export const EuiSubSteps: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiSubStepsProps
  >;

  /**
   * @see './steps_horizontal.js'
   */

  export interface EuiStepsHorizontalProps {
    steps: Array<{ isSelected?: boolean, disabled?: boolean, children?: ReactNode }>,
  }

  export const EuiStepsHorizontal: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiStepsHorizontalProps
  >;
}

