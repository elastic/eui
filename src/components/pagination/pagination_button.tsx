import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';

export interface EuiPaginationButtonProps {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
}

type Props = CommonProps &
  Omit<EuiButtonEmptyProps, 'size' | 'color'> &
  EuiPaginationButtonProps;

export const EuiPaginationButton: FunctionComponent<Props> = ({
  children,
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  ...rest
}) => {
  const classes = classNames('euiPaginationButton', className, {
    'euiPaginationButton-isActive': isActive,
    'euiPaginationButton-isPlaceholder': isPlaceholder,
    'euiPaginationButton--hideOnMobile': hideOnMobile,
  });

  return (
    <EuiButtonEmpty
      className={classes}
      size="xs"
      color="text"
      isDisabled={isPlaceholder}
      {...rest}>
      {children}
    </EuiButtonEmpty>
  );
};
