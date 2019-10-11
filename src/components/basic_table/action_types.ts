import { EuiIconType } from '../icon/icon';
import { ButtonIconColor } from '../button/button_icon/button_icon';
import { EuiButtonEmptyColor } from '../button/button_empty/button_empty';

type IconFunction = (item: any) => EuiIconType;
type ButtonColor = ButtonIconColor | EuiButtonEmptyColor;
type ButtonIconColorFunction = (item: any) => ButtonColor;

interface DefaultItemActionBase {
  name: string;
  description: string;
  onClick?: (item: any) => void;
  href?: string;
  target?: string;
  available?: (item: any) => boolean;
  enabled?: (item: any) => boolean;
  isPrimary?: boolean;
  'data-test-subj'?: string;
}

export interface DefaultItemEmptyButtonAction extends DefaultItemActionBase {
  type?: 'button';
  color?: EuiButtonEmptyColor | ButtonIconColorFunction;
}

export interface DefaultItemIconButtonAction extends DefaultItemActionBase {
  type: 'icon';
  icon: EuiIconType | IconFunction;
  color?: ButtonIconColor | ButtonIconColorFunction;
}

export type DefaultItemAction =
  | DefaultItemEmptyButtonAction
  | DefaultItemIconButtonAction;

export interface CustomItemAction {
  render: (item: any, enabled?: boolean) => any;
  available?: (item: any) => boolean;
  enabled?: (item: any) => boolean;
  isPrimary?: boolean;
}

export type Action = DefaultItemAction | CustomItemAction;
