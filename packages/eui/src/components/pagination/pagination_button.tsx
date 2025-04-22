/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExclusiveUnion, PropsForAnchor, PropsForButton } from '../common';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiI18n } from '../i18n';
import { useEuiTheme } from '../../services';
import { euiPaginationButtonStyles } from './pagination_button.styles';

export type EuiPaginationButtonProps = EuiButtonEmptyProps & {
  isActive?: boolean;
  pageIndex: number;
  totalPages?: number;
};

type EuiPaginationButtonPropsForAnchor =
  PropsForAnchor<EuiPaginationButtonProps>;

type EuiPaginationButtonPropsForButton =
  PropsForButton<EuiPaginationButtonProps>;

type Props = ExclusiveUnion<
  EuiPaginationButtonPropsForAnchor,
  EuiPaginationButtonPropsForButton
>;

export const EuiPaginationButton: FunctionComponent<Props> = ({
  className,
  isActive,
  pageIndex,
  totalPages,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiPaginationButtonStyles(euiTheme);
  const paginationButtonCss = [
    styles.euiPaginationButton,
    isActive && styles.isActive,
  ];

  const classes = classNames('euiPaginationButton', className);

  const props = {
    css: paginationButtonCss,
    className: classes,
    size: 's',
    color: 'text',
    'data-test-subj': `pagination-button-${pageIndex}`,
    isDisabled: isActive,
    ...(isActive && { 'aria-current': 'page' }),
    ...(rest['aria-controls'] && { href: `#${rest['aria-controls']}` }),
    ...rest,
  };

  const pageNumber = pageIndex + 1;

  return (
    <EuiI18n
      token="euiPaginationButton.longPageString"
      default="Page {page} of {totalPages}"
      values={{ page: pageNumber, totalPages: totalPages }}
    >
      {(longPageString: string) => (
        <EuiI18n
          token="euiPaginationButton.shortPageString"
          default="Page {page}"
          values={{ page: pageNumber }}
        >
          {(shortPageString: string) => (
            <EuiButtonEmpty
              aria-label={totalPages ? longPageString : shortPageString}
              {...(props as EuiButtonEmptyProps)}
            >
              {pageNumber}
            </EuiButtonEmpty>
          )}
        </EuiI18n>
      )}
    </EuiI18n>
  );
};
