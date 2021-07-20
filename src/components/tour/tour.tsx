/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
