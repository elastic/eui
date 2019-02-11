import ActionTypes from './action_types';

export const toggleLocale = locale => ({
  type: ActionTypes.TOGGLE_LOCALE,
  data: {
    locale,
  },
});
