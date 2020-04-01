export interface EuiTourState {
  currentTourStep: number;
  isTourActive: boolean;
  tourPopoverWidth: number;
  tourSubtitle: string;
}

export interface EuiTourAction {
  type: string;
  payload?: { [key: string]: any };
}

export interface EuiTourActions {
  [key: string]: (params?: any) => void;
}
