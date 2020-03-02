import React, { Fragment, HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type EuiHighlightProps = HTMLAttributes<HTMLSpanElement> &
  CommonProps & {
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
  isStrict: boolean = false,
  highlightAll: boolean = false
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
            return <strong key={start}>{value}</strong>;
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
      <strong>{match}</strong>
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
  const matches = Array.from(searchSubject.matchAll(regex), (match: any) => ({
    start: match.index,
    end: (match.index || 0) + match[0].length,
  }));
  return fillInChunks(matches, searchSubject.length);
};

export const fillInChunks = (chunksToHighlight: any[], totalLength: any) => {
  const allChunks: Array<{
    start: number;
    end: number;
    highlight: boolean;
  }> = [];
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
  strict,
  highlightAll,
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {highlight(children, search, strict, highlightAll)}
    </span>
  );
};
