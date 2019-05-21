import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPaginationButton } from './pagination_button';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';

const MAX_VISIBLE_PAGES = 5;
const NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

export const EuiPagination = ({
  className,
  pageCount,
  activePage,
  onPageClick,
  compressed,
  ...rest
}) => {
  const classes = classNames('euiPagination', className);

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
      <EuiI18n
        key={index}
        token="euiPagination.pageOfTotal"
        default="Page {page} of {total}"
        values={{ page: i + 1, total: lastPageInRange }}>
        {pageOfTotal => (
          <EuiPaginationButton
            isActive={i === activePage}
            onClick={onPageClick.bind(null, i)}
            hideOnMobile
            aria-label={pageOfTotal}
            data-test-subj={`pagination-button-${i}`}>
            {i + 1}
          </EuiPaginationButton>
        )}
      </EuiI18n>
    );
  }

  const previousButton = (
    <EuiI18n token="euiPagination.previousPage" default="Previous page">
      {previousPage => (
        <EuiButtonIcon
          onClick={onPageClick.bind(null, activePage - 1)}
          iconType="arrowLeft"
          disabled={activePage === 0}
          color="text"
          aria-label={previousPage}
          data-test-subj="pagination-button-previous"
        />
      )}
    </EuiI18n>
  );

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(
      <EuiI18n
        key="0"
        token="euiPagination.pageOfTotal"
        default="Page {page} of {total}"
        values={{ page: 1, total: lastPageInRange }}>
        {pageOfTotal => (
          <EuiPaginationButton
            onClick={onPageClick.bind(null, 0)}
            hideOnMobile
            aria-label={pageOfTotal}>
            1
          </EuiPaginationButton>
        )}
      </EuiI18n>
    );

    if (firstPageInRange > 1) {
      firstPageButtons.push(
        <EuiPaginationButton
          key="beginningEllipsis"
          isPlaceholder
          hideOnMobile
          aria-hidden>
          <span>&hellip;</span>
        </EuiPaginationButton>
      );
    }
  }

  const lastPageButtons = [];

  if (lastPageInRange < pageCount) {
    if (lastPageInRange < pageCount - 1) {
      lastPageButtons.push(
        <EuiPaginationButton
          key="endingEllipsis"
          isPlaceholder
          hideOnMobile
          aria-hidden>
          <span>&hellip;</span>
        </EuiPaginationButton>
      );
    }

    lastPageButtons.push(
      <EuiI18n
        key={pageCount - 1}
        token="euiPagination.jumpToLastPage"
        default="Jump to the last page, number {pageCount}"
        values={{ pageCount }}>
        {jumpToLastPage => (
          <EuiPaginationButton
            onClick={onPageClick.bind(null, pageCount - 1)}
            hideOnMobile
            aria-label={jumpToLastPage}>
            {pageCount}
          </EuiPaginationButton>
        )}
      </EuiI18n>
    );
  }

  const nextButton = (
    <EuiI18n token="euiPagination.nextPage" default="Next page">
      {nextPage => (
        <EuiButtonIcon
          onClick={onPageClick.bind(null, activePage + 1)}
          iconType="arrowRight"
          aria-label={nextPage}
          disabled={activePage === pageCount - 1}
          color="text"
          data-test-subj="pagination-button-next"
        />
      )}
    </EuiI18n>
  );

  if (pages.length > 1) {
    const selectablePages = pages;
    if (compressed) {
      return (
        <div className={classes} {...rest}>
          {previousButton}
          {nextButton}
        </div>
      );
    } else {
      return (
        <div className={classes} role="group" {...rest}>
          {previousButton}
          {firstPageButtons}
          {selectablePages}
          {lastPageButtons}
          {nextButton}
        </div>
      );
    }
  } else {
    // Don't render pagination if it isn't needed. Then span is here for a docs bug.
    return <span />;
  }
};

EuiPagination.propTypes = {
  className: PropTypes.string,

  /**
   * The total number of pages.
   */
  pageCount: PropTypes.number,

  /**
   * The current page using a zero based index.
   * So if you set the activePage to 1, it will activate the second page.
   */
  activePage: PropTypes.number,
  onPageClick: PropTypes.func,

  /**
   * If true, will only show next/prev arrows instead of page numbers.
   */
  compressed: PropTypes.bool,
};
