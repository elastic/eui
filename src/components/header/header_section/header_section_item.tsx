import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type Border = 'left' | 'right' | 'none';

const borderToClassNameMap: { [border in Border]: string | undefined } = {
  left: 'euiHeaderSectionItem--borderLeft',
  right: 'euiHeaderSectionItem--borderRight',
  none: undefined,
};

export type EuiHeaderSectionItemProps = CommonProps & {
  border?: Border;
  children?: ReactNode;
};

export const EuiHeaderSectionItem: FunctionComponent<
  EuiHeaderSectionItemProps
> = ({ border = 'left', children, className, ...rest }) => {
  const classes = classNames(
    'euiHeaderSectionItem',
    borderToClassNameMap[border],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
