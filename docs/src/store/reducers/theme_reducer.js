import ActionTypes from '../../actions/action_types';

const defaultState = {
  theme: 'light',
};

export default function sectionsReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_THEME: {
      return {
        theme: (state.theme === 'light') ? 'dark' : 'light',
      };
    }

    default:
      break;
  }

  return state;
}
