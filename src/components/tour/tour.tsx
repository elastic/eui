import { FunctionComponent, ReactElement } from 'react';
import { useEuiTour, EuiStatelessTourStep } from './useEuiTour';
import { EuiTourStepProps } from './tour_step';
import { EuiTourActions, EuiTourState } from './types';

export interface EuiTourProps {
  children: (
    steps: Array<(props: EuiTourStepProps) => ReactElement>,
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
  const [stepComponents, actions, state] = useEuiTour(steps, initialState);
  return children(stepComponents, actions, state);
};
