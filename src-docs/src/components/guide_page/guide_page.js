import PropTypes from 'prop-types';
import React, { Component } from 'react';

function GuidePage() {
  return (
    <div>
      {this.props.children}
    </div>
  );
}

GuidePage.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};
