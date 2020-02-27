import React, { ReactElement, useReducer } from 'react';
import { EuiTourStep, EuiTourStepProps } from './tour_step';
import { EuiTourState } from './types';

export const useEuiTour = (
  stepsArray: EuiTourStepProps[],
  initialState: EuiTourState
): [
  Array<(props: EuiTourStepProps) => ReactElement>,
  { [key: string]: () => void },
  EuiTourState
] => {
  function reducer(
    state: EuiTourState,
    action: { type: string }
  ): EuiTourState {
    switch (action.type) {
      case 'EUI_TOUR_SKIP':
        return {
          ...state,
          isTourActive: false,
        };
      case 'EUI_TOUR_RESET':
        return {
          ...state,
          currentTourStep: 1,
          isTourActive: true,
        };
      case 'EUI_TOUR_NEXT': {
        return {
          ...state,
          currentTourStep: state.currentTourStep + 1,
        };
      }
      case 'EUI_TOUR_PREVIOUS':
        return {
          ...state,
          currentTourStep: state.currentTourStep - 1,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const skipTour = () => dispatch({ type: 'EUI_TOUR_SKIP' });

  const steps = stepsArray.map(step => {
    return ({ children, ...rest }: EuiTourStepProps) => (
      <EuiTourStep
        step={step.step}
        title={step.title}
        content={step.content}
        anchorPosition={step.anchorPosition}
        isStepOpen={state.currentTourStep === step.step}
        isTourActive={state.isTourActive}
        minWidth={state.tourPopoverWidth}
        skipOnClick={skipTour}
        stepsTotal={stepsArray.length}
        subtitle={state.tourSubtitle}
        {...rest}>
        {children}
      </EuiTourStep>
    );
  });

  const actions: { [key: string]: () => void } = {
    skipTour,
    decrementStep: () => dispatch({ type: 'EUI_TOUR_PREVIOUS' }),
    incrementStep: () => dispatch({ type: 'EUI_TOUR_NEXT' }),
    resetTour: () => dispatch({ type: 'EUI_TOUR_RESET' }),
  };

  return [steps, actions, state];
};
