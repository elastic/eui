import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type Border = 'left' | 'right' | 'none';

const borderToClassNameMap: { [border in Border]: string | undefined } = {
  left: 'euiHeaderSectionItem--borderLeft',
  right: 'euiHeaderSectionItem--borderRight',
  none: undefined,
};

type Props = CommonProps & {
  border?: Border;
};

export const EuiHeaderSectionItem: FunctionComponent<Props> = ({
  border = 'left',
  children,
  className,
  ...rest
}) => {
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
