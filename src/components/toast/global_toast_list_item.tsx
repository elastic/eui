import {
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
  Children,
} from 'react';
import classNames from 'classnames';
import { CommonProps, Filter } from '../common';

export interface EuiGlobalToastListItemProps {
  isDismissed?: boolean;
  children?: Filter<{ props: ReactNode }, ReactNode>;
}

export const EuiGlobalToastListItem: FunctionComponent<
  CommonProps & EuiGlobalToastListItemProps
> = ({ children, isDismissed }) => {
  const classes = classNames(
    'euiGlobalToastListItem',
    children!.props.className,
    {
      'euiGlobalToastListItem-isDismissed': isDismissed,
    }
  );
  const child = Children.only(children);
  return cloneElement(child as ReactElement<any>, {
    ...children!.props,
    ...{ className: classes },
  });
};
