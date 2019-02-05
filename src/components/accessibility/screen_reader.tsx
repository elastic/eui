import { cloneElement, ReactElement, SFC } from 'react';
import classNames from 'classnames';

export interface EuiScreenReaderOnlyProps {
  children: ReactElement<any>;
}

export const EuiScreenReaderOnly: SFC<EuiScreenReaderOnlyProps> = ({
  children,
}) => {
  const classes = classNames('euiScreenReaderOnly', children.props.className);

  const props = {
    ...children.props,
    className: classes,
  };

  return cloneElement(children, props);
};
