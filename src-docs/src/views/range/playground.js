import { PropTypes } from 'react-view';
import { EuiRange, EuiDualRange } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const rangeConfig = () => {
  const docgenInfo = Array.isArray(EuiRange.__docgenInfo)
    ? EuiRange.__docgenInfo[0]
    : EuiRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };
  propsToUse.valueAppend = {
    ...propsToUse.valueAppend,
    type: PropTypes.String,
  };
  propsToUse.valuePrepend = {
    ...propsToUse.valuePrepend,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiRange',
      props: propsToUse,
      scope: {
        EuiRange,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const dualRangeConfig = () => {
  const docgenInfo = Array.isArray(EuiDualRange.__docgenInfo)
    ? EuiDualRange.__docgenInfo[0]
    : EuiDualRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };

  return {
    config: {
      componentName: 'EuiDualRange',
      props: propsToUse,
      scope: {
        EuiDualRange,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiDualRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
