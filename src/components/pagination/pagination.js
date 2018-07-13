import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPaginationButton } from './pagination_button';
import { EuiButtonIcon } from '../button';

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
  const firstPageInRange = Math.max(0, Math.min(activePage - NUMBER_SURROUNDING_PAGES, pageCount - MAX_VISIBLE_PAGES));
  const lastPageInRange = Math.min(pageCount, firstPageInRange + MAX_VISIBLE_PAGES);

  for (let i = firstPageInRange, index = 0; i < lastPageInRange; i++, index++) {
    pages.push(
      <EuiPaginationButton
        isActive={i === activePage}
        key={index}
        onClick={onPageClick.bind(null, i)}
        hideOnMobile
        aria-label={`Page ${i + 1} of ${lastPageInRange}`}
        data-test-subj={`pagination-button-${i}`}
      >
        {i + 1}
      </EuiPaginationButton>
    );
  }


  const previousButton = (
    <EuiButtonIcon
      onClick={onPageClick.bind(null, activePage - 1)}
      iconType="arrowLeft"
      disabled={activePage === 0}
      color="text"
      aria-label="Previous page"
    />
  );

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(
      <EuiPaginationButton
        key="0"
        onClick={onPageClick.bind(null, 0)}
        hideOnMobile
        aria-label={`Page 1 of ${lastPageInRange}`}
      >
        1
      </EuiPaginationButton>
    );

    if (firstPageInRange > 1) {
      firstPageButtons.push(
        <EuiPaginationButton
          key="beginningEllipsis"
          isPlaceholder
          hideOnMobile
          aria-hidden
        >
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
          aria-hidden
        >
          <span>&hellip;</span>
        </EuiPaginationButton>
      );
    }

    lastPageButtons.push(
      <EuiPaginationButton
        key={pageCount - 1}
        onClick={onPageClick.bind(null, pageCount - 1)}
        hideOnMobile
        aria-label={`Jump to the last page, number ${pageCount}`}
      >
        {pageCount}
      </EuiPaginationButton>
    );
  }

  const nextButton = (
    <EuiButtonIcon
      onClick={onPageClick.bind(null, activePage + 1)}
      iconType="arrowRight"
      aria-label="Next page"
      disabled={activePage === pageCount - 1}
      color="text"
    />
  );

  if (pages.length > 1) {
    const selectablePages = pages;
    if (compressed) {
      return (
        <div
          className={classes}
          {...rest}
        >
          {previousButton}
          {nextButton}
        </div>
      );
    } else {
      return (
        <div
          className={classes}
          role="group"
          {...rest}
        >
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
    return <span/>;
  }
};

EuiPagination.propTypes = {
  className: PropTypes.string,

  /**
   * The total number of pages
   */
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  onPageClick: PropTypes.func,

  /**
   * If true, will only show next/prev arrows instead of page numbers.
   */
  compressed: PropTypes.bool,
};
