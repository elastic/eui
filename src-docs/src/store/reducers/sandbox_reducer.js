import { LOCATION_CHANGE } from 'react-router-redux';

import Routes from '../../routes';

const defaultState = {
  isSandbox: undefined,
};

export default function sandboxReducer(state = defaultState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const path = action.payload.pathname;
      const route = Routes.getRouteForPath(path);
      const isSandbox = route ? route.isSandbox : false;

      return {
        isSandbox,
      };
    }

    default:
      break;
  }

  return state;
}
