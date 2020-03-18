import { ReactElement, FunctionComponent, cloneElement } from 'react';
import classNames from 'classnames';

export interface EuiCollapsibleNavToggleProps {
  children: ReactElement<any>;
  /**
   * The docked state must be passed in order to hide/show the toggle appropriately
   */
  navIsDocked: boolean;
}

export const EuiCollapsibleNavToggle: FunctionComponent<
  EuiCollapsibleNavToggleProps
> = ({ children, navIsDocked }) => {
  const classes = classNames(
    'euiCollapsibleNavToggle',
    {
      'euiCollapsibleNavToggle--navIsDocked': navIsDocked,
    },
    children.props.className
  );

  const props = {
    ...children.props,
    className: classes,
  };

  return cloneElement(children, props);
};
