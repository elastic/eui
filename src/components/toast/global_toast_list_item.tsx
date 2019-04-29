import { cloneElement, FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiGlobalToastListItemProps {
  isDismissed?: boolean;
  children?: ReactElement;
}

export const EuiGlobalToastListItem: FunctionComponent<
  CommonProps & EuiGlobalToastListItemProps
> = ({ children, isDismissed }) => {
  if (!children) {
    return null;
  }
  const classes = classNames(
    'euiGlobalToastListItem',
    children.props.className,
    {
      'euiGlobalToastListItem-isDismissed': isDismissed,
    }
  );

  return cloneElement(children, {
    ...children.props,
    ...{ className: classes },
  });
};
