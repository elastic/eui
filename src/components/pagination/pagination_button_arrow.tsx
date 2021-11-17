/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import {
  EuiButtonIcon,
  EuiButtonIconPropsForAnchor,
} from '../button/button_icon';
import { keysOf } from '../common';
import { useEuiI18n } from '../i18n';

const typeToIconTypeMap = {
  first: 'doubleArrowLeft',
  previous: 'arrowLeft',
  next: 'arrowRight',
  last: 'doubleArrowRight',
};

export const TYPES = keysOf(typeToIconTypeMap);
export type EuiPaginationButtonArrowType = typeof TYPES[number];

export type Props = Partial<Omit<EuiButtonIconPropsForAnchor, 'type'>> & {
  type: EuiPaginationButtonArrowType;
  activePage?: number;
  disabled?: boolean;
  ariaControls?: string;
};

export const EuiPaginationButtonArrow: FunctionComponent<Props> = ({
  type,
  activePage,
  disabled,
  ariaControls,
  onClick,
}) => {
  const labels = {
    first: useEuiI18n('euiPaginationButtonArrow.firstPage', 'First page'),
    previous: useEuiI18n(
      'euiPaginationButtonArrow.previousPage',
      'Previous page, {page}',
      {
        page: activePage ?? 1,
      }
    ),
    next: useEuiI18n('euiPaginationButtonArrow.nextPage', 'Next page, {page}', {
      page: activePage != null ? activePage + 2 : 2,
    }),
    last: useEuiI18n('euiPaginationButtonArrow.lastPage', 'Last page'),
  };

  const indeterminateLabels = {
    previous: useEuiI18n(
      'euiPaginationButtonArrow.previousPageIndeterminate',
      'Previous page, {count} from last page',
      {
        count: activePage != null ? Math.abs(activePage) : 1,
      }
    ),
    next: useEuiI18n(
      'euiPaginationButtonArrow.nextPageIndeterminate',
      'Next page, {count} from last page',
      {
        count: activePage != null ? Math.abs(activePage) - 2 : 2,
      }
    ),
  };

  let label =
    (type === 'next' || type === 'previous') &&
    activePage != null &&
    activePage < 0
      ? indeterminateLabels[type]
      : labels[type];
  if (type === 'next' && activePage === -2) {
    label = labels.last;
  }

  const buttonProps: Partial<EuiButtonIconPropsForAnchor> = {};

  if (ariaControls && !disabled) {
    buttonProps.href = `#${ariaControls}`;
    buttonProps['aria-controls'] = ariaControls;
  }

  return (
    <EuiButtonIcon
      color="text"
      aria-label={label}
      title={disabled ? undefined : label}
      isDisabled={disabled}
      onClick={onClick}
      data-test-subj={`pagination-button-${type}`}
      iconType={typeToIconTypeMap[type]}
      {...buttonProps}
    />
  );
};
