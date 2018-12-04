import PropTypes from 'prop-types';

export const commonlyUsedRangeShape = PropTypes.shape({
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

export const recentlyUsedRangeShape = PropTypes.shape({
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
});
