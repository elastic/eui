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

import React, { ReactElement, useState } from 'react';

import { EuiI18n } from '../i18n';

export interface PaginationButtonProps {
  pageIndex: number;
  inList?: boolean;
}

export type PaginationButton = (props: PaginationButtonProps) => ReactElement;

interface Props {
  pageCount: number;
  activePage: number;
  maxVisiblePages?: number;
}

const MAX_VISIBLE_PAGES = 5;

type Hook = (
  Button: PaginationButton,
  { pageCount, activePage }: Props
) => [
  {
    activePage: number;
    firstPageButtons: ReactElement[];
    selectablePageButtons: ReactElement[];
    lastPageButtons: ReactElement[];
  },
  { setActivePage: (page: number) => void }
];

export const usePagination: Hook = (
  Button,
  {
    pageCount = 1,
    activePage: activePageProp = 1,
    maxVisiblePages = MAX_VISIBLE_PAGES,
  }
) => {
  const NUMBER_SURROUNDING_PAGES = Math.floor(maxVisiblePages * 0.5);
  const [activePage, setActivePage] = useState(activePageProp);
  const selectablePageButtons: ReactElement[] = [];
  const firstPageInRange = Math.max(
    0,
    Math.min(activePage - NUMBER_SURROUNDING_PAGES, pageCount - maxVisiblePages)
  );
  const lastPageInRange = Math.min(
    pageCount,
    firstPageInRange + maxVisiblePages
  );

  for (let i = firstPageInRange, index = 0; i < lastPageInRange; i++, index++) {
    selectablePageButtons.push(<Button pageIndex={i} key={i} />);
  }

  const firstPageButtons = [];

  if (firstPageInRange > 0) {
    firstPageButtons.push(<Button pageIndex={0} key={0} />);

    if (firstPageInRange > 1 && firstPageInRange !== 2) {
      firstPageButtons.push(
        <EuiI18n
          key="startingEllipses"
          token="euiUsePagination.firstRangeAriaLabel"
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
      firstPageButtons.push(<Button pageIndex={1} key={1} />);
    }
  }

  const lastPageButtons = [];

  if (lastPageInRange < pageCount) {
    if (lastPageInRange + 1 === pageCount - 1) {
      lastPageButtons.push(
        <Button pageIndex={lastPageInRange} key={lastPageInRange} />
      );
    } else if (lastPageInRange < pageCount - 1) {
      lastPageButtons.push(
        <EuiI18n
          key="endingEllipses"
          token="euiUsePagination.lastRangeAriaLabel"
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
      <Button pageIndex={pageCount - 1} key={pageCount - 1} />
    );
  }

  return [
    { activePage, firstPageButtons, selectablePageButtons, lastPageButtons },
    { setActivePage },
  ];
};
