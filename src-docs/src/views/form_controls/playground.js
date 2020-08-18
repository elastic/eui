import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  iconValidator,
} from '../../services/playground';
import {
  EuiIcon,
  EuiFieldText,
  EuiFieldSearch,
  EuiFieldNumber,
  EuiFieldPassword,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

const fieldTextConfig = () => {
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

  propsToUse.value = {
    ...propsToUse.value,
    stateful: false,
    type: PropTypes.String,
    value: '',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);
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

export const fieldSearchConfig = () => {
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

  propsToUse.onSearch = simulateFunction(propsToUse.onSearch);
  propsToUse.onChange = simulateFunction(propsToUse.onChange);

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

export const fieldNumberConfig = () => {
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
  propsToUse.onChange = simulateFunction(propsToUse.onChange);

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

export const fieldPasswordConfig = () => {
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

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

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

export default [
  fieldTextConfig,
  fieldSearchConfig,
  fieldNumberConfig,
  fieldPasswordConfig,
];
