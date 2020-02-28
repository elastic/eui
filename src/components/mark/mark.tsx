import React, { Fragment, HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type EuiMarkProps = HTMLAttributes<HTMLSpanElement> &
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
  };

const mark = (
  searchSubject: string,
  searchValue: string,
  isStrict: boolean = false
) => {
  if (!searchValue) {
    return searchSubject;
  }
  if (!searchSubject) {
    return null;
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
      <mark>{match}</mark>
      {postMatch}
    </Fragment>
  );
};

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  search,
  strict,
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {mark(children, search, strict)}
    </span>
  );
};
