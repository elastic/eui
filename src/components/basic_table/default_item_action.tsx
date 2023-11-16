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
  EuiButtonEmptyProps,
  EuiButtonIconProps,
} from '../button';
import { EuiToolTip } from '../tool_tip';
import { DefaultItemAction as Action } from './action_types';
import { useGeneratedHtmlId } from '../../services/accessibility';
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
  let color: EuiButtonIconProps['color'] = 'primary';
  if (buttonColor) {
    color = isString(buttonColor) ? buttonColor : buttonColor(item);
  }

  const buttonIcon = action.icon;
  let icon;
  if (buttonIcon) {
    icon = isString(buttonIcon) ? buttonIcon : buttonIcon(item);
  }

  let button;
  const actionContent = callWithItemIfFunction(item)(action.name);
  const tooltipContent = callWithItemIfFunction(item)(action.description);
  const href = callWithItemIfFunction(item)(action.href);
  const dataTestSubj = callWithItemIfFunction(item)(action['data-test-subj']);

  const ariaLabelId = useGeneratedHtmlId();
  if (action.type === 'icon') {
    if (!icon) {
      throw new Error(`Cannot render item action [${action.name}]. It is configured to render as an icon but no
      icon is provided. Make sure to set the 'icon' property of the action`);
    }
    button = (
      <>
        <EuiButtonIcon
          className={className}
          aria-labelledby={ariaLabelId}
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
          href={href}
          target={action.target}
          data-test-subj={dataTestSubj}
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
        color={color as EuiButtonEmptyProps['color']}
        iconType={icon}
        onClick={onClick}
        href={href}
        target={action.target}
        data-test-subj={dataTestSubj}
        flush="right"
      >
        {actionContent}
      </EuiButtonEmpty>
    );
  }

  return enabled && tooltipContent ? (
    <EuiToolTip content={tooltipContent} delay="long">
      {button}
    </EuiToolTip>
  ) : (
    button
  );
};

const callWithItemIfFunction =
  <T,>(item: T) =>
  <U,>(prop: U | ((item: T) => U)): U =>
    typeof prop === 'function' ? (prop as Function)(item) : prop;
