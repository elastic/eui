/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, ReactNode, MouseEvent, useCallback } from 'react';

import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiButtonEmptyProps,
  EuiButtonIconProps,
} from '../button';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';
import { useGeneratedHtmlId } from '../../services/accessibility';
import { EuiScreenReaderOnly } from '../accessibility';

import {
  DefaultItemAction as Action,
  callWithItemIfFunction,
} from './action_types';

export interface DefaultItemActionProps<T extends object> {
  action: Action<T>;
  enabled: boolean;
  item: T;
  className?: string;
}

export const DefaultItemAction = <T extends object>({
  action,
  enabled,
  item,
  className,
}: DefaultItemActionProps<T>): ReactElement => {
  if (!action.onClick && !action.href) {
    throw new Error(`Cannot render item action [${action.name}]. Missing required 'onClick' callback
      or 'href' string. If you want to provide a custom action control, make sure to define the 'render' callback`);
  }

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (!action.onClick) return;
      event.persist(); // TODO: Remove once React 16 support is dropped
      action.onClick!(item, event);
    },
    [action.onClick, item]
  );

  const color: EuiButtonIconProps['color'] = action.color
    ? callWithItemIfFunction(item)(action.color)
    : 'primary';
  const icon = action.icon
    ? callWithItemIfFunction(item)(action.icon)
    : undefined;
  const actionContent = callWithItemIfFunction(item)(action.name);
  const tooltipContent = callWithItemIfFunction(item)(action.description);
  const tooltipProps: Omit<EuiToolTipProps, 'position' | 'children'> = {
    content: tooltipContent,
    delay: 'long',
    // Avoid screen-readers announcing the same text twice
    disableScreenReaderOutput:
      typeof actionContent === 'string' && actionContent === tooltipContent,
  };
  const href = callWithItemIfFunction(item)(action.href);
  const dataTestSubj = callWithItemIfFunction(item)(action['data-test-subj']);

  const ariaLabelId = useGeneratedHtmlId();
  let ariaLabelledBy: ReactNode;
  let button;

  if (action.type === 'icon') {
    if (!icon) {
      throw new Error(`Cannot render item action [${action.name}]. It is configured to render as an icon but no
      icon is provided. Make sure to set the 'icon' property of the action`);
    }
    button = (
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
        // If action is disabled, the normal tooltip can't show - attempt to
        // provide some amount of affordance with a browser title tooltip
        title={!enabled ? tooltipContent : undefined}
      />
    );
    // actionContent (action.name) is a ReactNode and must be rendered
    // to an element and referenced by ID for screen readers
    ariaLabelledBy = (
      <EuiScreenReaderOnly>
        <span id={ariaLabelId}>{actionContent}</span>
      </EuiScreenReaderOnly>
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

  return enabled ? (
    <>
      <EuiToolTip {...tooltipProps}>{button}</EuiToolTip>
      {/* SR text has to be rendered outside the tooltip,
      otherwise EuiToolTip's own aria-labelledby won't properly clone */}
      {ariaLabelledBy}
    </>
  ) : (
    <>
      {button}
      {ariaLabelledBy}
    </>
  );
};
