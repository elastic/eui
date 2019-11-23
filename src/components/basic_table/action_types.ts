import { ReactElement } from 'react';
import { EuiIconType } from '../icon/icon';
import { EuiButtonIconColor } from '../button/button_icon/button_icon';
import { EuiButtonEmptyColor } from '../button/button_empty';
import { ExclusiveUnion } from '../common';

type IconFunction<T> = (item: T) => EuiIconType;
type ButtonColor = EuiButtonIconColor | EuiButtonEmptyColor;
type EuiButtonIconColorFunction<T> = (item: T) => ButtonColor;

interface DefaultItemActionBase<T> {
  name: string;
  description: string;
  onClick?: (item: T) => void;
  href?: string;
  target?: string;
  available?: (item: T) => boolean;
  enabled?: (item: T) => boolean;
  isPrimary?: boolean;
  'data-test-subj'?: string;
}

export interface DefaultItemEmptyButtonAction<T>
  extends DefaultItemActionBase<T> {
  type?: 'button';
  color?: EuiButtonEmptyColor | EuiButtonIconColorFunction<T>;
}

export interface DefaultItemIconButtonAction<T>
  extends DefaultItemActionBase<T> {
  type: 'icon';
  icon: EuiIconType | IconFunction<T>;
  color?: EuiButtonIconColor | EuiButtonIconColorFunction<T>;
}

export type DefaultItemAction<T> = ExclusiveUnion<
  DefaultItemEmptyButtonAction<T>,
  DefaultItemIconButtonAction<T>
>;

export interface CustomItemAction<T> {
  render: (item: T, enabled: boolean) => ReactElement;
  available?: (item: T) => boolean;
  enabled?: (item: T) => boolean;
  isPrimary?: boolean;
}

export type Action<T> = DefaultItemAction<T> | CustomItemAction<T>;
