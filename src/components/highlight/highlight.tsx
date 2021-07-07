/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Fragment, HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import { EuiMark } from '../mark';

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

export type EuiHighlightProps = HTMLAttributes<HTMLSpanElement> &
  CommonProps & {
    /**
     * string to highlight as this component's content
     */
    children: string;

    /**
     * What to search for
     */
    search: string;

    /**
     * Should the search be strict or not
     */
    strict?: boolean;

    /**
     * Should highlight all matches
     */
    highlightAll?: boolean;
  };

const highlight = (
  searchSubject: string,
  searchValue: string,
  isStrict: boolean,
  highlightAll: boolean
) => {
  if (!searchValue) {
    return searchSubject;
  }

  if (!searchSubject) {
    return null;
  }

  if (highlightAll) {
    const chunks = getHightlightWords(searchSubject, searchValue, isStrict);
    return (
      <Fragment>
        {chunks.map((chunk) => {
          const { end, highlight, start } = chunk;
          const value = searchSubject.substr(start, end - start);
          if (highlight) {
            return <EuiMark key={start}>{value}</EuiMark>;
          }
          return value;
        })}
      </Fragment>
    );
  }

  const normalizedSearchSubject: string = isStrict
    ? searchSubject
    : searchSubject.toLowerCase();
  const normalizedSearchValue: string = isStrict
    ? searchValue
    : searchValue.toLowerCase();

  const indexOfMatch: number = normalizedSearchSubject.indexOf(
    normalizedSearchValue
  );
  if (indexOfMatch === -1) {
    return searchSubject;
  }

  const preMatch: string = searchSubject.substr(0, indexOfMatch);
  const match: string = searchSubject.substr(indexOfMatch, searchValue.length);
  const postMatch: string = searchSubject.substr(
    indexOfMatch + searchValue.length
  );

  return (
    <Fragment>
      {preMatch}
      <EuiMark>{match}</EuiMark>
      {postMatch}
    </Fragment>
  );
};

const getHightlightWords = (
  searchSubject: string,
  searchValue: string,
  isStrict: boolean
) => {
  const regex = new RegExp(searchValue, isStrict ? 'g' : 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(searchSubject)) !== null) {
    matches.push({
      start: match.index,
      end: (match.index || 0) + match[0].length,
    });
  }
  return fillInChunks(matches, searchSubject.length);
};

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

export const EuiHighlight: FunctionComponent<EuiHighlightProps> = ({
  children,
  className,
  search,
  strict = false,
  highlightAll = false,
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {highlight(children, search, strict, highlightAll)}
    </span>
  );
};
