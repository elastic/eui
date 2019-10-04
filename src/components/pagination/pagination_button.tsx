import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExclusiveUnion, PropsForAnchor, PropsForButton } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';

export type EuiPaginationButtonProps = EuiButtonEmptyProps & {
  isActive?: boolean;
  /**
   * For ellipsis or other non-clickable buttons.
   */
  isPlaceholder?: boolean;
  hideOnMobile?: boolean;
};

type EuiPaginationButtonPropsForAnchor = PropsForAnchor<
  EuiPaginationButtonProps
>;

type EuiPaginationButtonPropsForButton = PropsForButton<
  EuiPaginationButtonProps
>;

type Props = ExclusiveUnion<
  EuiPaginationButtonPropsForAnchor,
  EuiPaginationButtonPropsForButton
>;

export const EuiPaginationButton: FunctionComponent<Props> = ({
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

  const props = {
    className: classes,
    size: 'xs',
    color: 'text',
    isDisabled: isPlaceholder,
    ...rest,
  };

  return <EuiButtonEmpty {...props as EuiButtonEmptyProps} />;
};
