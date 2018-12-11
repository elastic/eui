import React, { HTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiExpressionProps = HTMLAttributes<HTMLButtonElement> & CommonProps & {
  description: string;
  buttonValue: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const EuiExpression: React.SFC<EuiExpressionProps> = ({
  className,
  description,
  buttonValue,
  isActive,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiExpressionButton', className, {
    'euiExpressionButton-isActive': isActive,
  });

  return (
    <button
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="euiExpressionButton__description">{description}</span>{' '}
      <span className="euiExpressionButton__value">{buttonValue}</span>
    </button>
  );
};

EuiExpression.defaultProps = {
  isActive: false,
};
