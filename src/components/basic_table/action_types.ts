/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement, ReactNode } from 'react';
import { EuiIconType } from '../icon/icon';
import { EuiButtonIconProps } from '../button/button_icon/button_icon';
import { EuiButtonEmptyProps } from '../button/button_empty';
import { ExclusiveUnion } from '../common';

type IconFunction<T> = (item: T) => EuiIconType;
type ButtonColor = EuiButtonIconProps['color'] | EuiButtonEmptyProps['color'];
type EuiButtonIconColorFunction<T> = (item: T) => ButtonColor;

export interface DefaultItemActionBase<T> {
  /**
   * The display name of the action (will render as visible text if rendered within a collapsed menu)
   */
  name: ReactNode | ((item: T) => ReactNode);
  /**
   * Describes the action (will render as tooltip content)
   */
  description: string | ((item: T) => string);
  /**
   * A handler function to execute the action
   */
  onClick?: (item: T) => void;
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
  isPrimary?: boolean;
  'data-test-subj'?: string | ((item: T) => string);
}

export interface DefaultItemEmptyButtonAction<T>
  extends DefaultItemActionBase<T> {
  /**
   * The type of action
   */
  type?: 'button';
  color?: EuiButtonEmptyProps['color'] | EuiButtonIconColorFunction<T>;
}

export interface DefaultItemIconButtonAction<T>
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

export type DefaultItemAction<T> = ExclusiveUnion<
  DefaultItemEmptyButtonAction<T>,
  DefaultItemIconButtonAction<T>
>;

export interface CustomItemAction<T> {
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
  isPrimary?: boolean;
}

export type Action<T> = DefaultItemAction<T> | CustomItemAction<T>;

export const isCustomItemAction = (
  action: DefaultItemAction<any> | CustomItemAction<any>
): action is CustomItemAction<any> => {
  return action.hasOwnProperty('render');
};
