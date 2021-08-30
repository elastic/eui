/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, MouseEvent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiPaginationButton } from './pagination_button';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { EuiText } from '../text';
import { EuiHideFor } from '../responsive';

const MAX_VISIBLE_PAGES = 5;
const NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

export type PageClickHandler = (pageIndex: number) => void;
type SafeClickHandler = (e: MouseEvent, pageIndex: number) => void;

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
}

type Props = CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps;

export const EuiPagination: FunctionComponent<Props> = ({
  className,
  pageCount = 1,
  activePage = 0,
  onPageClick = () => {},
  compressed,
  'aria-controls': ariaControls,
  ...rest
}) => {
  const safeClick: SafeClickHandler = (e, pageIndex) => {
    e.preventDefault();

    if (ariaControls) {
      const controlledElement = document.getElementById(ariaControls);

      if (controlledElement) {
        controlledElement.focus();
      }
    }

    onPageClick(pageIndex);
  };

  const sharedButtonProps = { activePage, pageCount, ariaControls, safeClick };

  const classes = classNames('euiPagination', className);
  const hasControl = ariaControls !== undefined;
  const pages = [];
  const firstPageInRange = Math.max(
    0,
    Math.min(
      activePage - NUMBER_SURROUNDING_PAGES,
      pageCount - MAX_VISIBLE_PAGES
    )
  );
  const lastPageInRange = Math.min(
    pageCount,
    firstPageInRange + MAX_VISIBLE_PAGES
  );

  for (let i = firstPageInRange, index = 0; i < lastPageInRange; i++, index++) {
    pages.push(
      <PaginationButtonWrapper pageIndex={i} key={i} {...sharedButtonProps} />
    );
  }

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
      values={{ page: activePage }}
    >
      {(previousPage: string) => (
        <EuiI18n
          token="euiPagination.disabledPreviousPage"
          default="Previous page"
        >
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

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(
      <PaginationButtonWrapper pageIndex={0} key={0} {...sharedButtonProps} />
    );

    if (firstPageInRange > 1 && firstPageInRange !== 2) {
      firstPageButtons.push(
        <EuiI18n
          key="startingEllipses"
          token="euiPagination.firstRangeAriaLabel"
          default="Skipping pages 2 to {lastPage}"
          values={{ lastPage: firstPageInRange }}
        >
          {(firstRangeAriaLabel: string) => (
            <li
              aria-label={firstRangeAriaLabel}
              className="euiPaginationButton-isPlaceholder euiPagination__item"
            >
              &hellip;
            </li>
          )}
        </EuiI18n>
      );
    } else if (firstPageInRange === 2) {
      firstPageButtons.push(
        <PaginationButtonWrapper pageIndex={1} key={1} {...sharedButtonProps} />
      );
    }
  }

  const lastPageButtons = [];

  if (lastPageInRange < pageCount) {
    if (lastPageInRange + 1 === pageCount - 1) {
      lastPageButtons.push(
        <PaginationButtonWrapper
          pageIndex={lastPageInRange}
          key={lastPageInRange}
          {...sharedButtonProps}
        />
      );
    } else if (lastPageInRange < pageCount - 1) {
      lastPageButtons.push(
        <EuiI18n
          key="endingEllipses"
          token="euiPagination.lastRangeAriaLabel"
          default="Skipping pages {firstPage} to {lastPage}"
          values={{ firstPage: lastPageInRange + 1, lastPage: pageCount - 1 }}
        >
          {(lastRangeAriaLabel: string) => (
            <li
              aria-label={lastRangeAriaLabel}
              className="euiPaginationButton-isPlaceholder euiPagination__item"
            >
              &hellip;
            </li>
          )}
        </EuiI18n>
      );
    }

    lastPageButtons.push(
      <PaginationButtonWrapper
        pageIndex={pageCount - 1}
        key={pageCount - 1}
        {...sharedButtonProps}
      />
    );
  }

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
      values={{ page: activePage + 2 }}
    >
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

  const selectablePages = pages;

  if (compressed) {
    const firstPageButtonCompressed = (
      <PaginationButtonWrapper
        pageIndex={activePage}
        inList={false}
        {...sharedButtonProps}
      />
    );
    const lastPageButtonCompressed = (
      <PaginationButtonWrapper
        pageIndex={pageCount - 1}
        inList={false}
        {...sharedButtonProps}
      />
    );

    return (
      <nav className={classes} {...rest}>
        {previousButton}
        <EuiHideFor sizes={['xs', 's']}>
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
        </EuiHideFor>
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
        {selectablePages}
        {lastPageButtons}
      </ul>
      {nextButton}
    </nav>
  );
};

const PaginationButtonWrapper = ({
  pageIndex,
  inList = true,
  activePage,
  pageCount,
  ariaControls,
  safeClick,
}: {
  pageIndex: number;
  inList?: boolean;
  activePage: number;
  pageCount: number;
  ariaControls?: string;
  safeClick: SafeClickHandler;
}) => {
  const button = (
    <EuiPaginationButton
      isActive={pageIndex === activePage}
      totalPages={pageCount}
      onClick={(e: MouseEvent) => safeClick(e, pageIndex)}
      pageIndex={pageIndex}
      aria-controls={ariaControls}
      hideOnMobile
    />
  );

  if (inList) {
    return <li className="euiPagination__item">{button}</li>;
  }

  return button;
};
