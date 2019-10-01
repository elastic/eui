import React, { FunctionComponent, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';
import { IconType } from '../../icon';

type Props = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    iconType?: IconType;
    isActive?: boolean;
  };

export const EuiHeaderLink: FunctionComponent<Props> = ({
  isActive,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLink', className);

  const props = {
    ...rest,
    className: classes,
    color: isActive ? 'primary' : 'text',
  };

  return <EuiButtonEmpty {...props as EuiButtonEmptyProps} />;
};
