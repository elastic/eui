import React, { FunctionComponent, HTMLAttributes, MouseEvent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiPaginationButton } from './pagination_button';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { EuiText } from '../text';

const MAX_VISIBLE_PAGES = 5;
const NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

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
  controls?: string;
}

type Props = CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps;

export const EuiPagination: FunctionComponent<Props> = ({
  className,
  pageCount = 1,
  activePage = 1,
  onPageClick = () => {},
  compressed,
  controls,
  ...rest
}) => {
  const safeClick = (e: MouseEvent, pageIndex: number) => {
    e.preventDefault();

    if (controls) {
      const controlledElement = document.getElementById(controls);

      if (controlledElement) {
        controlledElement.focus();
      }
    }

    onPageClick(pageIndex);
  };
  const PaginationButton = ({ pageIndex }: { pageIndex: number }) => (
    <li className="euiPagination__item">
      <EuiPaginationButton
        isActive={pageIndex === activePage}
        totalPages={pageCount}
        onClick={(e: MouseEvent) => safeClick(e, pageIndex)}
        pageIndex={pageIndex}
        {...hasControl && { 'aria-controls': controls }}
        hideOnMobile
      />
    </li>
  );
  const classes = classNames('euiPagination', className);
  const hasControl = typeof controls === 'string';
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
    pages.push(<PaginationButton pageIndex={i} key={i} />);
  }

  let prevPageButtonProps = {};
  if (hasControl && activePage !== 0) {
    prevPageButtonProps = { 'aria-controls': controls, href: `#${controls}` };
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

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(<PaginationButton pageIndex={0} key={0} />);

    if (firstPageInRange > 1 && firstPageInRange !== 2) {
      firstPageButtons.push(
        <EuiI18n
          key="startingEllipses"
          token="euiPagination.firstRangeAriaLabel"
          default="Skipping pages 2 to {lastPage}"
          values={{ lastPage: firstPageInRange }}>
          {(firstRangeAriaLabel: string) => (
            <li
              aria-label={firstRangeAriaLabel}
              className="euiPaginationButton-isPlaceholder euiPagination__item">
              &hellip;
            </li>
          )}
        </EuiI18n>
      );
    } else if (firstPageInRange === 2) {
      firstPageButtons.push(<PaginationButton pageIndex={1} key={1} />);
    }
  }

  const lastPageButtons = [];

  if (lastPageInRange < pageCount) {
    if (lastPageInRange + 1 === pageCount - 1) {
      lastPageButtons.push(
        <PaginationButton pageIndex={lastPageInRange} key={lastPageInRange} />
      );
    } else if (lastPageInRange < pageCount - 1) {
      lastPageButtons.push(
        <EuiI18n
          key="endingEllipses"
          token="euiPagination.lastRangeAriaLabel"
          default="Skipping pages {firstPage} to {lastPage}"
          values={{ firstPage: lastPageInRange + 1, lastPage: pageCount - 1 }}>
          {(lastRangeAriaLabel: string) => (
            <li
              aria-label={lastRangeAriaLabel}
              className="euiPaginationButton-isPlaceholder euiPagination__item">
              &hellip;
            </li>
          )}
        </EuiI18n>
      );
    }

    lastPageButtons.push(
      <PaginationButton pageIndex={pageCount - 1} key={pageCount - 1} />
    );
  }

  let nextPageButtonProps = {};
  if (hasControl && activePage !== pageCount - 1) {
    nextPageButtonProps = { 'aria-controls': controls, href: `#${controls}` };
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

  const selectablePages = pages;
  if (compressed) {
    const firstPageButtonCompressed = (
      <EuiPaginationButton
        onClick={onPageClick.bind(null, 0)}
        pageIndex={activePage}
        isActive={true}
      />
    );
    const lastPageButtonCompressed = (
      <EuiPaginationButton
        onClick={onPageClick.bind(null, pageCount - 1)}
        pageIndex={pageCount}
      />
    );
    return (
      <div className={classes} {...rest}>
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
      </div>
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
