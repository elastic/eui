import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';
import { IconType } from '../../icon';

export type EuiHeaderLinkProps = EuiButtonEmptyProps & {
  iconType?: IconType;
  isActive?: boolean;
};

export const EuiHeaderLink: FunctionComponent<EuiHeaderLinkProps> = ({
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
