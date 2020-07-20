/* eslint-disable guard-for-in */
import { PropTypes } from 'react-view';

const getProp = (prop, propName) => {
  const newProp = {};
  if (prop.description) newProp.description = prop.description;
  newProp.custom = { origin: prop };

  switch (prop.type.name) {
    case 'bool':
      newProp.type = PropTypes.Boolean;
      if (prop.defaultValue) {
        newProp.defaultValue = prop.defaultValue.value === 'true';
        newProp.value = prop.defaultValue.value === 'true';
      } else {
        newProp.defaultValue = false;
        newProp.value = false;
      }
      break;

    case 'enum':
      newProp.type = PropTypes.Enum;
      newProp.required = prop.required;
      if (prop.defaultValue) {
        newProp.defaultValue = prop.defaultValue.value;
        newProp.value = prop.defaultValue.value.substring(
          1,
          prop.defaultValue.value.length - 1
        );
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

    case 'number':
      newProp.type = PropTypes.Number;
      newProp.placeholder = propName;
      if (prop.defaultValue) newProp.value = prop.defaultValue.value;
      else newProp.value = 0;
      break;

    case 'string':
      newProp.type = PropTypes.String;
      newProp.placeholder = propName;
      if (prop.defaultValue) newProp.value = prop.defaultValue.value;
      else newProp.value = '';
      break;

    case 'func':
      newProp.type = PropTypes.Function;
      newProp.placeholder = propName;

      break;

    case 'node':
    case 'element':
      newProp.type = PropTypes.ReactNode;
      newProp.placeholder = propName;
      if (prop.defaultValue) newProp.value = prop.defaultValue.value;
      else newProp.value = undefined;
      break;

    default:
      newProp.type = PropTypes.Custom;
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
