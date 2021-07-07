/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { isString } from '../../services/predicate';
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiButtonEmptyColor,
  EuiButtonIconColor,
} from '../button';
import { EuiToolTip } from '../tool_tip';
import { DefaultItemAction as Action } from './action_types';
import { htmlIdGenerator } from '../../services/accessibility';
import { EuiScreenReaderOnly } from '../accessibility';

export interface DefaultItemActionProps<T> {
  action: Action<T>;
  enabled: boolean;
  item: T;
  className?: string;
}

// In order to use generics with an arrow function inside a .tsx file, it's necessary to use
// this `extends` hack and declare the types as shown, instead of declaring the const as a
// FunctionComponent
export const DefaultItemAction = <T extends {}>({
  action,
  enabled,
  item,
  className,
}: DefaultItemActionProps<T>): ReactElement => {
  if (!action.onClick && !action.href) {
    throw new Error(`Cannot render item action [${action.name}]. Missing required 'onClick' callback
      or 'href' string. If you want to provide a custom action control, make sure to define the 'render' callback`);
  }

  const onClick = action.onClick ? () => action.onClick!(item) : undefined;

  const buttonColor = action.color;
  let color: EuiButtonIconColor = 'primary';
  if (buttonColor) {
    color = isString(buttonColor) ? buttonColor : buttonColor(item);
  }

  const buttonIcon = action.icon;
  let icon;
  if (buttonIcon) {
    icon = isString(buttonIcon) ? buttonIcon : buttonIcon(item);
  }

  let button;
  const actionContent =
    typeof action.name === 'function' ? action.name(item) : action.name;
  if (action.type === 'icon') {
    if (!icon) {
      throw new Error(`Cannot render item action [${action.name}]. It is configured to render as an icon but no
      icon is provided. Make sure to set the 'icon' property of the action`);
    }
    const ariaLabelId = htmlIdGenerator()();
    button = (
      <>
        <EuiButtonIcon
          className={className}
          aria-labelledby={ariaLabelId}
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
          href={action.href}
          target={action.target}
          data-test-subj={action['data-test-subj']}
        />
        {/* actionContent (action.name) is a ReactNode and must be rendered to an element and referenced by ID for screen readers */}
        <EuiScreenReaderOnly>
          <span id={ariaLabelId}>{actionContent}</span>
        </EuiScreenReaderOnly>
      </>
    );
  } else {
    button = (
      <EuiButtonEmpty
        className={className}
        size="s"
        isDisabled={!enabled}
        color={color as EuiButtonEmptyColor}
        iconType={icon}
        onClick={onClick}
        href={action.href}
        target={action.target}
        data-test-subj={action['data-test-subj']}
        flush="right">
        {actionContent}
      </EuiButtonEmpty>
    );
  }

  return enabled && action.description ? (
    <EuiToolTip content={action.description} delay="long">
      {button}
    </EuiToolTip>
  ) : (
    button
  );
};
