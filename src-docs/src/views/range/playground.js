import { PropTypes } from 'react-view';
import { EuiRange, EuiDualRange } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const rangeConfig = () => {
  const docgenInfo = Array.isArray(EuiRange.__docgenInfo)
    ? EuiRange.__docgenInfo[0]
    : EuiRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.Number,
    value: '5',
  };
  propsToUse.min = {
    ...propsToUse.value,
    type: PropTypes.Number,
    value: '0',
  };
  propsToUse.max = {
    ...propsToUse.value,
    type: PropTypes.Number,
    value: '10',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange, true);

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    value: '1',
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to EuiDualRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.valuePrepend,
    type: PropTypes.String,
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
    type: PropTypes.Array,
    value: '[1, 9]',
  };
  propsToUse.min = {
    ...propsToUse.value,
    type: PropTypes.Number,
    value: '0',
  };
  propsToUse.max = {
    ...propsToUse.value,
    type: PropTypes.Number,
    value: '10',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange, true);

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    value: '1',
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to EuiRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
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
