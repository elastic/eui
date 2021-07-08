/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useReducer } from 'react';
import { assertNever } from '../common';
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
      case 'EUI_TOUR_FINISH': {
        const currentTourStep = action.payload.resetTour
          ? 1
          : state.currentTourStep;
        return {
          ...state,
          currentTourStep,
          isTourActive: false,
        };
      }
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
        const step = action.payload.step;
        const isTourActive =
          typeof action.payload.isTourActive !== 'undefined'
            ? action.payload.isTourActive
            : state.isTourActive;
        const goTo =
          step <= stepsArray.length && step > 0 ? step : state.currentTourStep;
        return {
          ...state,
          currentTourStep: goTo,
          isTourActive,
        };
      }
      default:
        assertNever(action);
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: EuiTourActions = {
    finishTour: (resetTour: boolean = true) =>
      dispatch({ type: 'EUI_TOUR_FINISH', payload: { resetTour } }),
    resetTour: () => dispatch({ type: 'EUI_TOUR_RESET' }),
    decrementStep: () => dispatch({ type: 'EUI_TOUR_PREVIOUS' }),
    incrementStep: () => dispatch({ type: 'EUI_TOUR_NEXT' }),
    goToStep: (step: number, isTourActive?: boolean) =>
      dispatch({ type: 'EUI_TOUR_GOTO', payload: { step, isTourActive } }),
  };

  const steps = stepsArray.map((step) => ({
    ...step,
    isStepOpen: state.currentTourStep === step.step && state.isTourActive,
    minWidth: state.tourPopoverWidth,
    onFinish: actions.finishTour,
    stepsTotal: stepsArray.length,
    subtitle: state.tourSubtitle,
  }));

  return [steps, actions, state];
};
