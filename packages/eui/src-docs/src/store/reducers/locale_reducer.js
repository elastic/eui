import ActionTypes from '../../actions/action_types';

const defaultState = {
  locale: 'en',
};

export default function localeReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOCALE: {
      return {
        locale: action.data.locale,
      };
    }

    default:
      break;
  }

  return state;
}
