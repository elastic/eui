/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export interface EuiTourState {
  currentTourStep: number;
  isTourActive: boolean;
  tourPopoverWidth: number;
  tourSubtitle: string;
}

interface ActionFinish {
  type: 'EUI_TOUR_FINISH';
  payload: { resetTour?: boolean };
}

interface ActionReset {
  type: 'EUI_TOUR_RESET';
}

interface ActionDecrement {
  type: 'EUI_TOUR_PREVIOUS';
}

interface ActionIncrement {
  type: 'EUI_TOUR_NEXT';
}

interface ActionGotoStep {
  type: 'EUI_TOUR_GOTO';
  payload: { step: number; isTourActive?: boolean };
}

export type EuiTourAction =
  | ActionFinish
  | ActionReset
  | ActionDecrement
  | ActionIncrement
  | ActionGotoStep;

export interface EuiTourActions {
  finishTour: (resetTour?: boolean) => void;
  resetTour: () => void;
  decrementStep: () => void;
  incrementStep: () => void;
  goToStep: (step: number, isTourActive?: boolean) => void;
}
