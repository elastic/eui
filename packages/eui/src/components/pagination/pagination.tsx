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
import { EuiI18n, useEuiI18n } from '../i18n';
import { EuiText } from '../text';
import { EuiPaginationButtonArrow } from './pagination_button_arrow';
import {
  EuiBreakpointSize,
  useIsWithinBreakpoints,
  useEuiTheme,
} from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { euiPaginationStyles } from './pagination.styles';

const MAX_VISIBLE_PAGES = 5;
const NUMBER_SURROUNDING_PAGES = Math.floor(MAX_VISIBLE_PAGES * 0.5);

export type PageClickHandler = (pageIndex: number) => void;
export type SafeClickHandler = (e: MouseEvent, pageIndex: number) => void;
export interface EuiPaginationProps {
  /**
   * The total number of pages.
   * Pass `0` if total count is unknown.
   */
  pageCount?: number;

  /**
   * The current page using a zero based index.
   * So if you set the activePage to 1, it will activate the second page.
   * Pass `-1` for forcing to last page.
   */
  activePage?: number;

  /**
   * Click handler that passes back the internally calculated `activePage` index
   */
  onPageClick?: (pageIndex: number) => void;

  /**
   * If true, will only show next/prev arrows and simplified number set.
   */
  compressed?: boolean;

  /**
   * If passed in, passes value through to each button to set aria-controls.
   */
  'aria-controls'?: string;

  /**
   * Automatically reduces to the `compressed` version on smaller screens.
   * Remove completely with `false` or provide your own list of responsive breakpoints.
   */
  responsive?: false | EuiBreakpointSize[];
}

type Props = CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps;

export const EuiPagination: FunctionComponent<Props> = ({
  className,
  pageCount = 1,
  activePage = 0,
  onPageClick = () => {},
  compressed: _compressed,
  'aria-controls': ariaControls,
  responsive = ['xs', 's'],
  ...rest
}) => {
  const isResponsive = useIsWithinBreakpoints(
    responsive as EuiBreakpointSize[],
    !!responsive
  );

  const euiTheme = useEuiTheme();
  const styles = euiPaginationStyles(euiTheme);

  // Force to `compressed` version if specified or within the responsive breakpoints
  const compressed = _compressed || isResponsive;

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

  const classes = classNames('euiPagination', className);

  const firstButton = (pageCount < 1 || compressed) && (
    <EuiPaginationButtonArrow
      type="first"
      ariaControls={ariaControls}
      onClick={(e: MouseEvent) => safeClick(e, 0)}
      disabled={activePage === 0}
    />
  );

  const previousButton = (
    <EuiPaginationButtonArrow
      type="previous"
      ariaControls={ariaControls}
      onClick={(e: MouseEvent) => safeClick(e, activePage - 1)}
      disabled={activePage === 0}
    />
  );

  const nextButton = (
    <EuiPaginationButtonArrow
      type="next"
      ariaControls={ariaControls}
      onClick={(e: MouseEvent) => safeClick(e, activePage + 1)}
      disabled={activePage === -1 || activePage === pageCount - 1}
    />
  );

  const lastButton = (pageCount < 1 || compressed) && (
    <EuiPaginationButtonArrow
      type="last"
      ariaControls={ariaControls}
      onClick={(e: MouseEvent) => safeClick(e, pageCount ? pageCount - 1 : -1)}
      disabled={activePage === -1 || activePage === pageCount - 1}
    />
  );

  let centerPageCount;

  if (pageCount) {
    const sharedButtonProps = {
      activePage,
      ariaControls,
      safeClick,
      pageCount,
    };

    if (compressed) {
      centerPageCount = (
        <EuiText
          size="s"
          css={styles.euiPagination__compressedText}
          className="euiPagination__compressedText"
        >
          <EuiI18n
            token="euiPagination.pageOfTotalCompressed"
            default="{page} of {total}"
            values={{
              page: <span key="activePage">{activePage + 1}</span>,
              total: <span key="pageCount">{pageCount}</span>,
            }}
          />
        </EuiText>
      );
    } else {
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

      for (
        let i = firstPageInRange, index = 0;
        i < lastPageInRange;
        i++, index++
      ) {
        pages.push(
          <PaginationButtonWrapper
            pageIndex={i}
            key={i}
            {...sharedButtonProps}
          />
        );
      }

      const firstPageButtons = [];

      if (firstPageInRange > 0) {
        firstPageButtons.push(
          <PaginationButtonWrapper
            pageIndex={0}
            key={0}
            {...sharedButtonProps}
          />
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
                  className="euiPagination__item"
                  css={styles.euiPagination__ellipsis}
                >
                  &hellip;
                </li>
              )}
            </EuiI18n>
          );
        } else if (firstPageInRange === 2) {
          firstPageButtons.push(
            <PaginationButtonWrapper
              pageIndex={1}
              key={1}
              {...sharedButtonProps}
            />
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
              values={{
                firstPage: lastPageInRange + 1,
                lastPage: pageCount - 1,
              }}
            >
              {(lastRangeAriaLabel: string) => (
                <li
                  aria-label={lastRangeAriaLabel}
                  className="euiPagination__item"
                  css={styles.euiPagination__ellipsis}
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

      const selectablePages = pages;

      const accessibleName = {
        ...(rest['aria-label'] && { 'aria-label': rest['aria-label'] }),
        ...(rest['aria-labelledby'] && {
          'aria-labelledby': rest['aria-labelledby'],
        }),
      };

      centerPageCount = (
        <ul
          className="euiPagination__list"
          css={styles.euiPagination__list}
          {...accessibleName}
        >
          {firstPageButtons}
          {selectablePages}
          {lastPageButtons}
        </ul>
      );
    }
  }

  // All the i18n strings used to build the whole SR-only text
  const lastLabel = useEuiI18n('euiPagination.last', 'Last');
  const pageLabel = useEuiI18n('euiPagination.page', 'Page');
  const ofLabel = useEuiI18n('euiPagination.of', 'of');
  const collectionLabel = useEuiI18n('euiPagination.collection', 'collection');
  const fromEndLabel = useEuiI18n('euiPagination.fromEndLabel', 'from end');

  // Based on the `activePage` count, build the front of the SR-only text
  // i.e. `Page 1`, `Page 2 from end`, `Last Page`
  const accessiblePageString = (): string => {
    if (activePage < -1)
      return `${pageLabel} ${Math.abs(activePage)} ${fromEndLabel}`;
    if (activePage === -1) return `${lastLabel} ${pageLabel}`;
    return `${pageLabel} ${activePage + 1}`;
  };

  // If `pageCount` is unknown call it `collection`
  const accessibleCollectionString =
    pageCount === 0 ? collectionLabel : pageCount.toString();

  // Create the whole string with total pageCount or `collection`
  const accessiblePageCount = `${accessiblePageString()} ${ofLabel} ${accessibleCollectionString}`;

  return (
    <nav css={styles.euiPagination} className={classes} {...rest}>
      <EuiScreenReaderOnly>
        <span aria-atomic="true" aria-relevant="additions text" role="status">
          {accessiblePageCount}
        </span>
      </EuiScreenReaderOnly>
      {firstButton}
      {previousButton}
      {centerPageCount}
      {nextButton}
      {lastButton}
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
  disabled,
}: {
  pageIndex: number;
  inList?: boolean;
  activePage: number;
  pageCount: number;
  ariaControls?: string;
  safeClick: SafeClickHandler;
  disabled?: boolean;
}) => {
  const button = (
    <EuiPaginationButton
      isActive={pageIndex === activePage}
      totalPages={pageCount}
      onClick={(e: MouseEvent) => safeClick(e, pageIndex)}
      pageIndex={pageIndex}
      aria-controls={ariaControls}
      disabled={disabled}
    />
  );

  if (inList) {
    return <li className="euiPagination__item">{button}</li>;
  }

  return button;
};
