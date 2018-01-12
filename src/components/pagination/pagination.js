import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPaginationButton } from './pagination_button';

const MAX_VISIBLE_PAGES = 5;
const NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

export const EuiPagination = ({
  className,
  pageCount,
  activePage,
  onPageClick,
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
      >
        {i + 1}
      </EuiPaginationButton>
    );
  }

  let previousButton;

  if (activePage !== 0) {
    previousButton = (
      <EuiPaginationButton
        onClick={onPageClick.bind(null, activePage - 1)}
        iconType="arrowLeft"
      >
        Previous
      </EuiPaginationButton>
    );
  }

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(
      <EuiPaginationButton
        key="0"
        onClick={onPageClick.bind(null, 0)}
        hideOnMobile
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
        />
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
        />
      );
    }

    lastPageButtons.push(
      <EuiPaginationButton
        key={pageCount - 1}
        onClick={onPageClick.bind(null, pageCount - 1)}
        hideOnMobile
      >
        {pageCount}
      </EuiPaginationButton>
    );
  }

  let nextButton;

  if (activePage !== pageCount - 1) {
    nextButton = (
      <EuiPaginationButton
        onClick={onPageClick.bind(null, activePage + 1)}
        iconType="arrowRight"
        iconSide="right"
      >
        Next
      </EuiPaginationButton>
    );
  }

  let selectablePages;
  if (pages.length > 1) {
    selectablePages = pages;
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {previousButton}
      {firstPageButtons}
      {selectablePages}
      {lastPageButtons}
      {nextButton}
    </div>
  );
};

EuiPagination.propTypes = {
  className: PropTypes.string,
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  onPageClick: PropTypes.func,
};
