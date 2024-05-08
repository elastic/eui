/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement, ReactNode, MouseEvent } from 'react';
import { EuiIconType } from '../icon/icon';
import { EuiButtonIconProps } from '../button/button_icon/button_icon';
import { EuiButtonEmptyProps } from '../button/button_empty';
import { ExclusiveUnion } from '../common';

type IconFunction<T extends object> = (item: T) => EuiIconType;
type ButtonColor = EuiButtonIconProps['color'] | EuiButtonEmptyProps['color'];
type EuiButtonIconColorFunction<T> = (item: T) => ButtonColor;

export interface DefaultItemActionBase<T extends object> {
  /**
   * The display name of the action (will render as visible text if rendered within a collapsed menu)
   */
  name: ReactNode | ((item: T) => ReactNode);
  /**
   * Describes the action (will render as tooltip content)
   */
  description: string | ((item: T) => string);
  /**
   * A handler function to execute the action. Passes back the current row
   * item as the first argument, and the originating React click event
   * as a second argument.
   */
  onClick?: (item: T, event: MouseEvent) => void;
  href?: string | ((item: T) => string);
  target?: string;
  /**
   * A callback function that determines whether the action is available
   */
  available?: (item: T) => boolean;
  /**
   * A callback function that determines whether the action is enabled
   */
  enabled?: (item: T) => boolean;
  'data-test-subj'?: string | ((item: T) => string);
  /**
   * If more than 3 actions are passed, 2 primary actions will show (on hover)
   * next to an expansion menu of all actions.
   *
   * On mobile, primary actions will be tucked away in the expansion menu for space.
   */
  isPrimary?: boolean;
  /**
   * Allows only showing the action on mouse hover or keyboard focus.
   * If more than 3 actions are passed, this will always be true for `isPrimary` actions.
   *
   * Has no effect on mobile, or if `hasActions` is not set.
   */
  showOnHover?: boolean;
}

export interface DefaultItemEmptyButtonAction<T extends object>
  extends DefaultItemActionBase<T> {
  /**
   * The type of action
   */
  type?: 'button';
  color?: EuiButtonEmptyProps['color'] | EuiButtonIconColorFunction<T>;
}

export interface DefaultItemIconButtonAction<T extends object>
  extends DefaultItemActionBase<T> {
  type: 'icon';
  /**
   * Associates an icon with the button
   */
  icon: EuiIconType | IconFunction<T>;
  /**
   * Defines the color of the button
   */
  color?: EuiButtonIconProps['color'] | EuiButtonIconColorFunction<T>;
}

export type DefaultItemAction<T extends object> = ExclusiveUnion<
  DefaultItemEmptyButtonAction<T>,
  DefaultItemIconButtonAction<T>
>;

export type CustomItemAction<T> = {
  /**
   * Allows rendering a totally custom action
   */
  render: (item: T, enabled: boolean) => ReactElement;
  /**
   * A callback that defines whether the action is available
   */
  available?: (item: T) => boolean;
  /**
   * A callback that defines whether the action is enabled
   */
  enabled?: (item: T) => boolean;
} & Pick<DefaultItemActionBase<{}>, 'isPrimary' | 'showOnHover'>;

export type Action<T extends object> =
  | DefaultItemAction<T>
  | CustomItemAction<T>;

export const isCustomItemAction = <T extends object>(
  action: DefaultItemAction<T> | CustomItemAction<T>
): action is CustomItemAction<T> => {
  return action.hasOwnProperty('render');
};

export const callWithItemIfFunction =
  <T>(item: T) =>
  <U>(prop: U | ((item: T) => U)): U =>
    typeof prop === 'function' ? (prop as Function)(item) : prop;
