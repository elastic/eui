/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo, FunctionComponent } from 'react';
import escapeRegExp from 'lodash/escapeRegExp';

import type { _SharedSubcomponentProps } from './highlight';

/**
 * Internal subcomponent with logic for highlighting all occurrences
 * of a search value within a subject
 *
 * Uses regex rather than indexOf/while loops for easier dev maintainability
 */
export const HighlightAll: FunctionComponent<_SharedSubcomponentProps> = ({
  searchSubject,
  searchValue: _searchValue,
  isStrict,
  highlightComponent: HighlightComponent = 'mark',
}) => {
  const searchValue = useMemo(() => {
    return Array.isArray(_searchValue)
      ? _searchValue.map(escapeRegExp).join('|')
      : escapeRegExp(_searchValue);
  }, [_searchValue]);

  const chunks = useMemo(() => {
    const regex = new RegExp(searchValue, isStrict ? 'g' : 'gi');
    const matches = [...searchSubject.matchAll(regex)].map((match) => ({
      start: match.index || 0,
      end: (match.index || 0) + match[0].length,
    }));

    return fillInChunks(matches, searchSubject.length);
  }, [searchValue, searchSubject, isStrict]);

  return (
    <>
      {chunks.map((chunk) => {
        const { end, highlight, start } = chunk;
        const value = searchSubject.substring(start, end);

        return highlight ? (
          <HighlightComponent key={start}>{value}</HighlightComponent>
        ) : (
          value
        );
      })}
    </>
  );
};

/**
 * Chunk utility
 */

interface EuiHighlightChunk {
  /**
   * Start of the chunk
   */
  start: number;
  /**
   * End of the chunk
   */
  end: number;
  /**
   * Whether to highlight chunk or not
   */
  highlight?: boolean;
}
const fillInChunks = (
  chunksToHighlight: EuiHighlightChunk[],
  totalLength: number
) => {
  const allChunks: EuiHighlightChunk[] = [];
  const append = (start: number, end: number, highlight: boolean) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight,
      });
    }
  };
  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false);
  } else {
    let lastIndex = 0;
    chunksToHighlight.forEach((chunk) => {
      append(lastIndex, chunk.start, false);
      append(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    append(lastIndex, totalLength, false);
  }
  return allChunks;
};
