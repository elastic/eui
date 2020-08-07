import { iconTypes } from '../../views/icon/icons';
import { mapOptions } from './mapOptions';
import { PropTypes } from 'react-view';

const iconOptions = mapOptions(iconTypes);

export const iconValidator = prop => {
  const newProp = {
    ...prop,
    value: undefined,
    type: PropTypes.String,
    custom: {
      ...prop.custom,
      validator: val => iconOptions[val],
    },
  };
  return newProp;
};
