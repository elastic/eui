/* eslint-disable guard-for-in */
import { PropTypes } from 'react-view';

const getProp = (prop, propName) => {
  const newProp = {};
  switch (prop.type.name) {
    case 'bool':
      newProp.type = PropTypes.Boolean;
      if (prop.description) newProp.description = prop.description;
      if (prop.defaultValue) {
        newProp.defaultValue = prop.defaultValue.value === 'true';
        newProp.value = prop.defaultValue.value === 'true';
      } else {
        newProp.defaultValue = false;
        newProp.value = false;
      }
      break;

    case 'enum':
      //   console.log('prop', prop);
      newProp.type = PropTypes.Enum;
      newProp.description = prop.description;
      newProp.required = prop.required;
      if (prop.defaultValue) {
        newProp.defaultValue = prop.defaultValue.value;
        newProp.value = prop.defaultValue.value;
      } else {
        newProp.value = undefined;
      }
      newProp.options = {};
      for (const i in prop.type.value) {
        const val = prop.type.value[i].value;
        const key = val.substring(1, val.length - 1);
        newProp.options[key] = key;
      }
      break;

    case 'string':
      newProp.type = PropTypes.String;
      newProp.placeholder = propName;
      if (prop.description) newProp.description = prop.description;
      if (prop.defaultValue) newProp.value = prop.defaultValue.value;
      else newProp.value = undefined;
      break;

    default:
      newProp.type = PropTypes.Custom;
      newProp.custom = {};
      if (prop.description) newProp.description = prop.description;
      newProp.value = undefined;
  }

  return newProp;
};

const propUtilityForPlayground = props => {
  const modifiedProps = {};

  for (const key in props) {
    if (props[key].type) modifiedProps[key] = getProp(props[key], key);
  }
  return modifiedProps;
};

export default propUtilityForPlayground;
