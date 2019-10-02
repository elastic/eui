import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type Props = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const EuiHeaderSectionItemButton: FunctionComponent<Props> = ({
  onClick,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderSectionItem__button', className);

  return (
    <button className={classes} onClick={onClick} type="button" {...rest}>
      {children}
    </button>
  );
};
