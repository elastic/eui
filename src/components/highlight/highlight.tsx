import React, { Fragment } from 'react';

const highlight = (
  searchSubject: string,
  searchValue: string,
  isStrict = false
) => {
  if (!searchValue) {
    return searchSubject;
  }

  const normalizedSearchSubject = isStrict
    ? searchSubject
    : searchSubject.toLowerCase();
  const normalizedSearchValue = isStrict
    ? searchValue
    : searchValue.toLowerCase();

  const indexOfMatch = normalizedSearchSubject.indexOf(normalizedSearchValue);
  if (indexOfMatch === -1) {
    return searchSubject;
  }

  const preMatch = searchSubject.substr(0, indexOfMatch);
  const match = searchSubject.substr(indexOfMatch, searchValue.length);
  const postMatch = searchSubject.substr(indexOfMatch + searchValue.length);

  return (
    <Fragment>
      {preMatch}
      <strong>{match}</strong>
      {postMatch}
    </Fragment>
  );
};

export type EuiHighlightProps = Pick<
  React.HTMLAttributes<HTMLSpanElement>,
  Exclude<keyof React.HTMLAttributes<HTMLSpanElement>, 'children'>
> & {
  children: string;
  search: string;
  strict?: boolean;
};

export const EuiHighlight = (props: EuiHighlightProps) => {
  const { children, className, search, strict, ...rest } = props;

  return (
    <span className={className} {...rest}>
      {highlight(children, search, strict)}
    </span>
  );
};
