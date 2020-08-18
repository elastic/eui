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
        {chunks.map(chunk => {
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
    chunksToHighlight.forEach(chunk => {
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
