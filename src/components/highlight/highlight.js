import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const highlight = (searchSubject, searchValue, isStrict = false) => {
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

export const EuiHighlight = ({
  children,
  className,
  search,
  strict,
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {highlight(children, search, strict)}
    </span>
  );
};

EuiHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  search: PropTypes.string.isRequired,
  strict: PropTypes.bool,
};
