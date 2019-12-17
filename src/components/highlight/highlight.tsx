import React, { Fragment, HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import PropTypes from 'prop-types';

export type EuiHighlightProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * What to search for
     */
    search: string;

    /**
     * Should the search be strict or not
     */
    strict?: boolean;
  };

const highlight = (
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
      <strong>{match}</strong>
      {postMatch}
    </Fragment>
  );
};

export const EuiHighlight: FunctionComponent<EuiHighlightProps> = ({
  children,
  className,
  search,
  strict,
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {highlight(children as string, search, strict)}
    </span>
  );
};

EuiHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  search: PropTypes.string.isRequired,
  strict: PropTypes.bool,
};
