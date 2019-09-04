import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { ExclusiveUnion } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';

export interface EuiPaginationButtonProps extends EuiButtonEmptyProps {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
}

type EuiPaginationButtonPropsForAnchor = EuiPaginationButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type EuiPaginationButtonPropsForButton = EuiPaginationButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

type Props = ExclusiveUnion<
  EuiPaginationButtonPropsForAnchor,
  EuiPaginationButtonPropsForButton
>;

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
