/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { _SharedSubcomponentProps } from './highlight';

/**
 * Internal subcomponent with logic for highlighting only the first occurrence
 * of a search value within a subject
 *
 * Uses indexOf for performance (which does matter for, e.g. EuiSelectable searching)
 */
export const HighlightFirst: FunctionComponent<_SharedSubcomponentProps> = ({
  searchSubject,
  searchValue,
  isStrict,
  highlightComponent: HighlightComponent = 'mark',
}) => {
  if (Array.isArray(searchValue)) {
    throw new Error(
      'Cannot parse multiple search strings without `highlightAll` enabled'
    );
  }

  const normalizedSearchSubject = isStrict
    ? searchSubject
    : searchSubject.toLowerCase();
  const normalizedSearchValue = isStrict
    ? searchValue
    : searchValue.toLowerCase();

  const indexOfMatch = normalizedSearchSubject.indexOf(normalizedSearchValue);
  if (indexOfMatch === -1) {
    return <>{searchSubject}</>;
  }

  const preMatch = searchSubject.substring(0, indexOfMatch);
  const match = searchSubject.substring(
    indexOfMatch,
    indexOfMatch + searchValue.length
  );
  const postMatch = searchSubject.substring(indexOfMatch + searchValue.length);

  return (
    // Note: React 16/17 will render empty strings in the DOM. The
    // `|| undefined` prevents this & keeps snapshots the same for all versions
    <>
      {preMatch || undefined}
      <HighlightComponent>{match}</HighlightComponent>
      {postMatch || undefined}
    </>
  );
};
