/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiButtonIcon,
  EuiButtonIconPropsForAnchor,
} from '../button/button_icon';
import { keysOf } from '../common';
import { useEuiI18n } from '../i18n';
import { useEuiTheme } from '../../services';
import { euiPaginationButtonArrowStyles } from './pagination_button.styles';

const typeToIconTypeMap = {
  first: 'arrowStart',
  previous: 'arrowLeft',
  next: 'arrowRight',
  last: 'arrowEnd',
};

export const TYPES = keysOf(typeToIconTypeMap);
export type EuiPaginationButtonArrowType = typeof TYPES[number];

export type Props = Partial<Omit<EuiButtonIconPropsForAnchor, 'type'>> & {
  type: EuiPaginationButtonArrowType;
  disabled?: boolean;
  ariaControls?: string;
};

export const EuiPaginationButtonArrow: FunctionComponent<Props> = ({
  className,
  type,
  disabled,
  ariaControls,
  onClick,
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiPaginationButtonArrowStyles(euiTheme);

  const labels = {
    first: useEuiI18n('euiPaginationButtonArrow.firstPage', 'First page'),
    previous: useEuiI18n(
      'euiPaginationButtonArrow.previousPage',
      'Previous page'
    ),
    next: useEuiI18n('euiPaginationButtonArrow.nextPage', 'Next page'),
    last: useEuiI18n('euiPaginationButtonArrow.lastPage', 'Last page'),
  };

  const buttonProps: Partial<EuiButtonIconPropsForAnchor> = {};

  if (ariaControls && !disabled) {
    buttonProps.href = `#${ariaControls}`;
    buttonProps['aria-controls'] = ariaControls;
  }

  return (
    <EuiButtonIcon
      css={styles.euiPaginationArrowButton}
      className={classNames('euiPaginationArrowButton', className)}
      color="text"
      aria-label={labels[type]}
      title={disabled ? undefined : labels[type]}
      isDisabled={disabled}
      onClick={onClick}
      data-test-subj={`pagination-button-${type}`}
      iconType={typeToIconTypeMap[type]}
      {...buttonProps}
    />
  );
};
