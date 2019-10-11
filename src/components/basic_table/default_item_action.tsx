import React, { FunctionComponent } from 'react';
import { isString } from '../../services/predicate';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';
import { EuiIconType } from '../icon/icon';
import { ButtonIconColor } from '../button/button_icon/button_icon';
import { EuiButtonEmptyColor } from '../button/button_empty/button_empty';

type IconFunction = (item: any) => EuiIconType;
type ButtonColor = ButtonIconColor | EuiButtonEmptyColor;
type ButtonIconColorFunction = (item: any) => ButtonColor;

interface ActionBase {
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

export interface EmptyButtonAction extends ActionBase {
  type?: 'button';
  color?: EuiButtonEmptyColor | ButtonIconColorFunction;
}

export interface IconButtonAction extends ActionBase {
  type: 'icon';
  icon: EuiIconType | IconFunction;
  color?: ButtonIconColor | ButtonIconColorFunction;
}

interface Props {
  action: EmptyButtonAction | IconButtonAction;
  enabled: boolean;
  item: any;
  className?: string;
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
