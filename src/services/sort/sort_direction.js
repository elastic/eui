import PropTypes from 'prop-types';

export const SortDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
  isAsc(direction) {
    return direction === this.ASC;
  },
  reverse(direction) {
    return this.isAsc(direction) ? this.DESC : this.ASC;
  }
});

export const SortDirectionType = PropTypes.oneOf([ SortDirection.ASC, SortDirection.DESC ]);
