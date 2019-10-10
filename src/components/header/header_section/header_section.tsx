import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type HeaderSectionSide = 'left' | 'right';

const sideToClassNameMap: { [side in HeaderSectionSide]: string } = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right',
};

type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    side?: HeaderSectionSide;
    grow?: boolean;
  };

export const EuiHeaderSection: FunctionComponent<Props> = ({
  side = 'left',
  children,
  className,
  grow = false,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSection',
    {
      'euiHeaderSection--grow': grow,
      'euiHeaderSection--dontGrow': !grow,
    },
    sideToClassNameMap[side],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
