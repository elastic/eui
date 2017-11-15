import PropTypes from 'prop-types';
import React from 'react';

export function GuidePage({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

GuidePage.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};
