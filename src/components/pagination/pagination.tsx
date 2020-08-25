/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes, MouseEvent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  EuiPaginationButton,
  EuiPaginationButtonProps,
} from './pagination_button';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { EuiText } from '../text';
import { usePagination } from './use_pagination';

export type PageClickHandler = (pageIndex: number) => void;

export interface EuiPaginationProps {
  /**
   * The total number of pages.
   */
  pageCount?: number;

  /**
   * The current page using a zero based index.
   * So if you set the activePage to 1, it will activate the second page.
   */
  activePage?: number;

  onPageClick?: PageClickHandler;

  /**
   * If true, will only show next/prev arrows instead of page numbers.
   */
  compressed?: boolean;

  /**
   * If passed in, passes value through to each button to set aria-controls
   */
  'aria-controls'?: string;

  /**
   * If provided, this will be the button used for each page.  Defaults to
   * `EuiPaginationButton`.
   */
  button?: FunctionComponent<EuiPaginationButtonProps>;
}

type Props = CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps;

export const EuiPagination: FunctionComponent<Props> = ({
  className,
  pageCount = 1,
  activePage: activePageProp = 1,
  onPageClick = () => {},
  compressed,
  'aria-controls': ariaControls,
  button: PaginationButton = EuiPaginationButton,
  ...rest
}) => {
  const Button = ({
    pageIndex,
    inList = true,
  }: {
    pageIndex: number;
    inList?: boolean;
  }) => {
    const button = (
      <PaginationButton
        isActive={pageIndex === activePage}
        totalPages={pageCount}
        onClick={(e: MouseEvent) => safeClick(e, pageIndex)}
        pageIndex={pageIndex}
        {...(hasControl && { 'aria-controls': ariaControls })}
        hideOnMobile
      />
    );

    if (inList) {
      return <li className="euiPagination__item">{button}</li>;
    }

    return button;
  };

  const classes = classNames('euiPagination', className);
  const hasControl = ariaControls !== undefined;
  const [
    { activePage, selectablePageButtons, firstPageButtons, lastPageButtons },
    { setActivePage },
  ] = usePagination(Button, {
    pageCount,
    activePage: activePageProp,
  });

  const safeClick = (e: MouseEvent, pageIndex: number) => {
    e.preventDefault();
    setActivePage(pageIndex);

    if (ariaControls) {
      const controlledElement = document.getElementById(ariaControls);

      if (controlledElement) {
        controlledElement.focus();
      }
    }

    onPageClick(pageIndex);
  };

  let prevPageButtonProps = {};
  if (hasControl && activePage !== 0) {
    prevPageButtonProps = {
      'aria-controls': ariaControls,
      href: `#${ariaControls}`,
    };
  } else {
    prevPageButtonProps = { disabled: activePage === 0 };
  }

  const previousButton = (
    <EuiI18n
      token="euiPagination.previousPage"
      default="Previous page, {page}"
      values={{ page: activePage }}>
      {(previousPage: string) => (
        <EuiI18n
          token="euiPagination.disabledPreviousPage"
          default="Previous page">
          {(disabledPreviousPage: string) => (
            <EuiButtonIcon
              onClick={(e: MouseEvent) => safeClick(e, activePage - 1)}
              iconType="arrowLeft"
              color="text"
              aria-label={
                activePage === 0 ? disabledPreviousPage : previousPage
              }
              data-test-subj="pagination-button-previous"
              {...prevPageButtonProps}
            />
          )}
        </EuiI18n>
      )}
    </EuiI18n>
  );

  let nextPageButtonProps = {};
  if (hasControl && activePage !== pageCount - 1) {
    nextPageButtonProps = {
      'aria-controls': ariaControls,
      href: `#${ariaControls}`,
    };
  } else {
    nextPageButtonProps = { disabled: activePage === pageCount - 1 };
  }

  const nextButton = (
    <EuiI18n
      token="euiPagination.nextPage"
      default="Next page, {page}"
      values={{ page: activePage + 2 }}>
      {(nextPage: string) => (
        <EuiI18n token="euiPagination.disabledNextPage" default="Next page">
          {(disabledNextPage: string) => (
            <EuiButtonIcon
              onClick={(e: MouseEvent) => safeClick(e, activePage + 1)}
              iconType="arrowRight"
              aria-label={
                activePage === pageCount - 1 ? disabledNextPage : nextPage
              }
              color="text"
              data-test-subj="pagination-button-next"
              {...nextPageButtonProps}
            />
          )}
        </EuiI18n>
      )}
    </EuiI18n>
  );

  if (compressed) {
    const firstPageButtonCompressed = (
      <Button pageIndex={activePage} inList={false} />
    );
    const lastPageButtonCompressed = (
      <Button pageIndex={pageCount - 1} inList={false} />
    );
    return (
      <nav className={classes} {...rest}>
        {previousButton}
        <EuiText size="s" className="euiPagination__compressedText">
          <EuiI18n
            token="euiPagination.pageOfTotalCompressed"
            default="{page} of {total}"
            values={{
              page: firstPageButtonCompressed,
              total: lastPageButtonCompressed,
            }}
          />
        </EuiText>
        {nextButton}
      </nav>
    );
  }

  const accessibleName = {
    ...(rest['aria-label'] && { 'aria-label': rest['aria-label'] }),
    ...(rest['aria-labelledby'] && {
      'aria-labelledby': rest['aria-labelledby'],
    }),
  };

  return (
    <nav className={classes} {...rest}>
      {previousButton}
      <ul {...accessibleName} className="euiPagination__list">
        {firstPageButtons}
        {selectablePageButtons}
        {lastPageButtons}
      </ul>
      {nextButton}
    </nav>
  );
};
