import PropTypes from 'prop-types';

export const commonlyUsedRange = PropTypes.shape({
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});
