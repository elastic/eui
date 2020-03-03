import { cloneElement, ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiScreenReaderOnlyProps {
  children: ReactElement<any>;

  /**
   * For keyboard navigaiton, force content to display visually upon focus.
   */
  showOnFocus?: boolean;
}

export const EuiScreenReaderOnly: FunctionComponent<
  EuiScreenReaderOnlyProps
> = ({ children, showOnFocus }) => {
  const classes = classNames('euiScreenReaderOnly', children.props.className, {
    'euiScreenReaderOnly--showOnFocus': showOnFocus,
  });

  const props = {
    ...children.props,
    className: classes,
  };

  return cloneElement(children, props);
};
