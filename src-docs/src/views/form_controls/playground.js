import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  iconValidator,
} from '../../services/playground';
import {
  EuiFieldText,
  EuiFieldSearch,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiTextArea,
  EuiCheckbox,
  EuiRadio,
  EuiSwitch,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const FieldTextConfig = () => {
  const docgenInfo = Array.isArray(EuiFieldText.__docgenInfo)
    ? EuiFieldText.__docgenInfo[0]
    : EuiFieldText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };

  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.icon = iconValidator(propsToUse.icon);

  return {
    config: {
      componentName: 'EuiFieldText',
      props: propsToUse,
      scope: {
        EuiFieldText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFieldText'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldSearchConfig = () => {
  const docgenInfo = Array.isArray(EuiFieldSearch.__docgenInfo)
    ? EuiFieldSearch.__docgenInfo[0]
    : EuiFieldSearch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiFieldSearch',
      props: propsToUse,
      scope: {
        EuiFieldSearch,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFieldSearch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldNumberConfig = () => {
  const docgenInfo = Array.isArray(EuiFieldNumber.__docgenInfo)
    ? EuiFieldNumber.__docgenInfo[0]
    : EuiFieldNumber.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.icon = iconValidator(propsToUse.icon);

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.Number,
  };
  propsToUse.step = {
    ...propsToUse.step,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'EuiFieldNumber',
      props: propsToUse,
      scope: {
        EuiFieldNumber,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFieldNumber'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const FieldPasswordConfig = () => {
  const docgenInfo = Array.isArray(EuiFieldPassword.__docgenInfo)
    ? EuiFieldPassword.__docgenInfo[0]
    : EuiFieldPassword.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.type = {
    ...propsToUse.type,
    value: 'password',
    defaultValue: 'password',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiFieldPassword',
      props: propsToUse,
      scope: {
        EuiFieldPassword,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFieldPassword'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const TextAreaConfig = () => {
  const docgenInfo = Array.isArray(EuiTextArea.__docgenInfo)
    ? EuiTextArea.__docgenInfo[0]
    : EuiTextArea.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };
  propsToUse.placeholder = {
    ...propsToUse.placeholder,
    type: PropTypes.String,
  };

  propsToUse.resize = {
    ...propsToUse.resize,
    defaultValue: 'vertical',
  };

  propsToUse.disabled = {
    type: PropTypes.Boolean,
  };

  propsToUse.readOnly = {
    type: PropTypes.Boolean,
  };

  propsToUse.placeholder = {
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiTextArea',
      props: propsToUse,
      scope: {
        EuiTextArea,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTextArea'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const CheckboxConfig = () => {
  const docgenInfo = Array.isArray(EuiCheckbox.__docgenInfo)
    ? EuiCheckbox.__docgenInfo[0]
    : EuiCheckbox.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: 'Playground__checkbox',
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'EuiCheckbox',
      props: propsToUse,
      scope: {
        EuiCheckbox,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCheckbox'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const RadioConfig = () => {
  const docgenInfo = Array.isArray(EuiRadio.__docgenInfo)
    ? EuiRadio.__docgenInfo[0]
    : EuiRadio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    type: PropTypes.String,
    value: 'Playground__radio',
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'EuiRadio',
      props: propsToUse,
      scope: {
        EuiRadio,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiRadio'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const SwitchConfig = () => {
  const docgenInfo = Array.isArray(EuiSwitch.__docgenInfo)
    ? EuiSwitch.__docgenInfo[0]
    : EuiSwitch.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.checked = {
    ...propsToUse.checked,
    value: true,
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'EuiSwitch',
      props: propsToUse,
      scope: {
        EuiSwitch,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSwitch'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
