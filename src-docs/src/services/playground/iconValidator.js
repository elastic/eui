import { iconTypes } from '../../views/icon/icons';
import { iconTypes as logoTypes } from '../../views/icon/logos';
import { mapOptions } from './mapOptions';
import { PropTypes } from 'react-view';

const iconOptions = mapOptions(iconTypes.concat(logoTypes));

export const iconValidator = (prop = { custom: {} }) => {
  const newProp = {
    ...prop,
    value: undefined,
    type: PropTypes.String,
    custom: {
      ...prop.custom,
      validator: (val) => iconOptions[val],
    },
  };
  return newProp;
};
