import { connect } from 'react-redux';

import { getTheme } from '../../store'; // update this to point at the store.js file

function mapStateToProps(state) {
  return {
    theme: getTheme(state),
  };
}

export const withTheme = connect(mapStateToProps);
