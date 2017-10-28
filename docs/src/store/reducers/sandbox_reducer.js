import { LOCATION_CHANGE } from 'react-router-redux';

import ActionTypes from '../../actions/action_types';
import { Routes } from '../../services';

const defaultState = {
  isSandbox: undefined,
};

export default function sandboxReducer(state = defaultState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const path = action.payload.pathname;
      const { isSandbox } = Routes.getRouteForPath(path);

      return Object.assign({}, state, {
        isSandbox,
      });
    }

    default:
      break;
  }

  return state;
}
