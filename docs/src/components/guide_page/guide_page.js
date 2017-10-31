import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class GuidePage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

GuidePage.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};
