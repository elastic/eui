/* eslint-disable guard-for-in */
import { PropTypes } from 'react-view';

const getProp = (prop) => {
  const newProp = {};
  if (prop.description) newProp.description = prop.description;
  newProp.custom = { origin: prop };

  switch (prop.type.name) {
    case 'boolean':
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
      }
      newProp.value = undefined;
      newProp.options = {};
      for (const i in prop.type.value) {
        const val = prop.type.value[i].value;
        const key = val.substring(1, val.length - 1);
        newProp.options[key] = key;
      }
      break;

    case 'number':
      newProp.type = PropTypes.Number;
      if (prop.defaultValue) newProp.defaultValue = prop.defaultValue.value;
      break;

    case 'string':
      newProp.type = PropTypes.String;
      if (prop.defaultValue) newProp.defaultValue = prop.defaultValue.value;
      break;

    case 'func':
      newProp.type = PropTypes.Function;

      break;

    case 'node':
    case 'element':
      newProp.type = PropTypes.ReactNode;
      if (prop.defaultValue) newProp.defaultValue = prop.defaultValue.value;
      newProp.value = undefined;
      break;

    default:
      newProp.type = PropTypes.Custom;
      newProp.value = undefined;
  }

  return newProp;
};

const propUtilityForPlayground = (props, withTheme = false) => {
  const modifiedProps = {};

  if (withTheme) {
    delete props.theme;
  }

  for (const key in props) {
    if (props[key].type) {
      modifiedProps[key] = getProp(props[key]);
    }
  }

  return modifiedProps;
};

export default propUtilityForPlayground;
