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
    throw new Error(`Cannot render item action [${
      action.name
    }]. Missing required 'onClick' callback
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
  if (action.type === 'icon') {
    if (!icon) {
      throw new Error(`Cannot render item action [${
        action.name
      }]. It is configured to render as an icon but no
      icon is provided. Make sure to set the 'icon' property of the action`);
    }
    button = (
      <EuiButtonIcon
        className={className}
        aria-label={action.name}
        isDisabled={!enabled}
        color={color}
        iconType={icon}
        onClick={onClick}
        href={action.href}
        target={action.target}
        data-test-subj={action['data-test-subj']}
      />
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
        {action.name}
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
