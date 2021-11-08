/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { toSentenceCase } from '../../services';

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
  let labelModifier: number | undefined;

  if (type === 'previous') {
    labelModifier = activePage != null ? activePage : 0;
  } else if (type === 'next') {
    labelModifier = activePage != null ? activePage + 2 : 0;
  }

  const label = useEuiI18n(
    'euiPaginationButtonArrow.previousPage',
    ({ page }) => `${toSentenceCase(type)} page${page ? `, ${page}` : ''}`,
    {
      page: labelModifier,
    }
  );

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
