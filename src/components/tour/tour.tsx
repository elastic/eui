/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

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
