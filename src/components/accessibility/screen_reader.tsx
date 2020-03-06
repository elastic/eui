import { cloneElement, ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiScreenReaderOnlyProps {
  children: ReactElement<any>;

  /**
   * For keyboard navigation, force content to display visually upon focus.
   */
  showOnFocus?: boolean;
}

export const EuiScreenReaderOnly: FunctionComponent<
  EuiScreenReaderOnlyProps
> = ({ children, showOnFocus }) => {
  const classes = classNames(
    {
      euiScreenReaderOnly: !showOnFocus,
      'euiScreenReaderOnly--showOnFocus': showOnFocus,
    },
    children.props.className
  );

  const props = {
    ...children.props,
    className: classes,
  };

  return cloneElement(children, props);
};
