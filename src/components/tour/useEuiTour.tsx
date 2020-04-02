import { useReducer } from 'react';
import { EuiTourStepProps } from './tour_step';
import { EuiTourAction, EuiTourActions, EuiTourState } from './types';

export type EuiStatelessTourStep = Omit<EuiTourStepProps, keyof EuiTourState> &
  Partial<EuiTourState>;

export const useEuiTour = (
  stepsArray: EuiStatelessTourStep[],
  initialState: EuiTourState
): [EuiTourStepProps[], EuiTourActions, EuiTourState] => {
  function reducer(state: EuiTourState, action: EuiTourAction): EuiTourState {
    switch (action.type) {
      case 'EUI_TOUR_FINISH':
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
      case 'EUI_TOUR_NEXT': {
        const nextStep =
          state.currentTourStep === stepsArray.length
            ? state.currentTourStep
            : state.currentTourStep + 1;
        return {
          ...state,
          currentTourStep: nextStep,
        };
      }
      case 'EUI_TOUR_PREVIOUS': {
        const prevStep =
          state.currentTourStep === 1
            ? state.currentTourStep
            : state.currentTourStep - 1;
        return {
          ...state,
          currentTourStep: prevStep,
        };
      }
      case 'EUI_TOUR_GOTO': {
        const step = action.payload
          ? action.payload.step
          : state.currentTourStep;
        const goTo =
          step <= stepsArray.length && step > 0 ? step : state.currentTourStep;
        return {
          ...state,
          currentTourStep: goTo,
        };
      }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: EuiTourActions = {
    finishTour: () => dispatch({ type: 'EUI_TOUR_FINISH' }),
    resetTour: () => dispatch({ type: 'EUI_TOUR_RESET' }),
    decrementStep: () => dispatch({ type: 'EUI_TOUR_PREVIOUS' }),
    incrementStep: () => dispatch({ type: 'EUI_TOUR_NEXT' }),
    goToStep: (step: number) =>
      dispatch({ type: 'EUI_TOUR_GOTO', payload: { step } }),
  };

  const steps = stepsArray.map(step => ({
    ...step,
    isStepOpen: state.currentTourStep === step.step,
    isTourActive: state.isTourActive,
    minWidth: state.tourPopoverWidth,
    onFinish: actions.finishTour,
    stepsTotal: stepsArray.length,
    subtitle: state.tourSubtitle,
  }));

  return [steps, actions, state];
};
