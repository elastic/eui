import { FunctionComponent, ReactElement } from 'react';
import { useEuiTour } from './useEuiTour';
import { EuiTourStepProps } from './tour_step';
import { EuiTourState } from './types';

export interface EuiTourProps {
  children: (
    steps: Array<(props: EuiTourStepProps) => ReactElement>,
    actions: { [key: string]: () => void },
    state: EuiTourState
  ) => ReactElement;
  steps: Array<Partial<EuiTourStepProps>>; // TODO: children may not yet exist
  initialState: EuiTourState;
}

export const EuiTour: FunctionComponent<EuiTourProps> = ({
  children,
  steps,
  initialState,
}) => {
  const [stepComponents, actions, state] = useEuiTour(
    steps as EuiTourStepProps[],
    initialState
  );
  return children(stepComponents, actions, state);
};
