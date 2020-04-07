export interface EuiTourState {
  currentTourStep: number;
  isTourActive: boolean;
  tourPopoverWidth: number;
  tourSubtitle: string;
}

interface ActionFinish {
  type: 'EUI_TOUR_FINISH';
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
  payload: { step: number };
}

export type EuiTourAction =
  | ActionFinish
  | ActionReset
  | ActionDecrement
  | ActionIncrement
  | ActionGotoStep;

export interface EuiTourActions {
  finishTour: () => void;
  resetTour: () => void;
  decrementStep: () => void;
  incrementStep: () => void;
  goToStep: (step: number) => void;
}
