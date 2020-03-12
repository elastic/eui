import { FunctionComponent, ReactElement } from 'react';
import { useEuiTour, EuiStatelessTourStep } from './useEuiTour';
import { EuiTourStepProps } from './tour_step';
import { EuiTourActions, EuiTourState } from './types';

export interface EuiTourProps {
  children: (
    steps: EuiTourStepProps[],
    actions: EuiTourActions,
    state: EuiTourState
  ) => ReactElement;
  steps: EuiStatelessTourStep[];
  initialState: EuiTourState;
}

export const EuiTour: FunctionComponent<EuiTourProps> = ({
  children,
  steps,
  initialState,
}) => {
  const [stepProps, actions, state] = useEuiTour(steps, initialState);
  return children(stepProps, actions, state);
};
