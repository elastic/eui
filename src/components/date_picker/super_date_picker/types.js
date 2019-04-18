import PropTypes from 'prop-types';

export const commonlyUsedRangeShape = PropTypes.shape({
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

export const recentlyUsedRangeShape = PropTypes.shape({
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
});

export const quickSelectPanelShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
});
