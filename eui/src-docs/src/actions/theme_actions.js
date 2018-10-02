import ActionTypes from './action_types';

export const toggleTheme = theme => ({
  type: ActionTypes.TOGGLE_THEME,
  data: {
    theme,
  },
});
