import PropTypes from 'prop-types';

const ASC = 'asc';
const DESC = 'desc';
const isAsc = direction => direction === ASC;
const reverse = direction => isAsc(direction) ? DESC : ASC;

export const SortDirection = {
  ASC,
  DESC,
  isAsc,
  reverse,
};

export const SortDirectionType = PropTypes.oneOf([ SortDirection.ASC, SortDirection.DESC ]);
