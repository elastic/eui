import React, { FunctionComponent } from 'react';
import { isString } from '../../services/predicate';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';
import {
  DefaultItemAction as Action,
  DefaultItemIconButtonAction as IconButtonAction,
} from './action_types';
import { Item, ItemId } from './table_types';

interface Props {
  action: Action;
  enabled: boolean;
  item: Item;
  itemId?: ItemId;
  className?: string;
  index?: number;
}

export const DefaultItemAction: FunctionComponent<Props> = ({
  action,
  enabled,
  item,
  className,
}: Props) => {
  if (!action.onClick && !action.href) {
    throw new Error(`Cannot render item action [${
      action.name
    }]. Missing required 'onClick' callback
      or 'href' string. If you want to provide a custom action control, make sure to define the 'render' callback`);
  }

  const onClick = action.onClick ? () => action.onClick!(item) : undefined;

  const resolveActionColor = (action: any) =>
    isString(action.color) ? action.color : action.color(item);
  const color = action.color ? resolveActionColor(action) : 'primary';

  const { icon: buttonIcon } = action as IconButtonAction;
  const resolveActionIcon = (action: any) =>
    isString(action.icon) ? action.icon : action.icon(item);
  const icon = buttonIcon ? resolveActionIcon(action) : undefined;

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
        color={color}
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
