import React, { ReactElement, useReducer } from 'react';
import { EuiTourStep, EuiTourStepProps } from './tour_step';
import { EuiTourAction, EuiTourActions, EuiTourState } from './types';

export type EuiStatelessTourStep = Omit<EuiTourStepProps, keyof EuiTourState> &
  Partial<EuiTourState>;

export const useEuiTour = (
  stepsArray: EuiStatelessTourStep[],
  initialState: EuiTourState
): [
  Array<(props: EuiTourStepProps) => ReactElement>,
  EuiTourActions,
  EuiTourState
] => {
  function reducer(state: EuiTourState, action: EuiTourAction): EuiTourState {
    switch (action.type) {
      case 'EUI_TOUR_SKIP':
        return {
          ...state,
          isTourActive: false,
        };
      case 'EUI_TOUR_END':
        return {
          ...state,
          currentTourStep: 1,
          isTourActive: false,
        };
      case 'EUI_TOUR_RESET':
        return {
          ...state,
          currentTourStep: 1,
          isTourActive: true,
        };
      case 'EUI_TOUR_NEXT':
        return {
          ...state,
          currentTourStep: state.currentTourStep + 1,
        };
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

  const endTour = () => dispatch({ type: 'EUI_TOUR_END' });
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
        onEnd={endTour}
        onSkip={skipTour}
        stepsTotal={stepsArray.length}
        subtitle={state.tourSubtitle}
        {...rest}>
        {children}
      </EuiTourStep>
    );
  });

  const actions: EuiTourActions = {
    endTour,
    skipTour,
    resetTour: () => dispatch({ type: 'EUI_TOUR_RESET' }),
    decrementStep: () => dispatch({ type: 'EUI_TOUR_PREVIOUS' }),
    incrementStep: () => dispatch({ type: 'EUI_TOUR_NEXT' }),
  };

  return [steps, actions, state];
};
