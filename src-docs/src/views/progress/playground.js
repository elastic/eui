import { PropTypes } from 'react-view';
import { EuiProgress } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiProgress.__docgenInfo)
    ? EuiProgress.__docgenInfo[0]
    : EuiProgress.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    value: undefined,
    type: PropTypes.Number,
  };

  propsToUse.valueText = {
    ...propsToUse.valueText,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
  };

  propsToUse.color = {
    ...propsToUse.color,
    value: 'success',
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiProgress',
      props: propsToUse,
      scope: {
        EuiProgress,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiProgress'],
        },
      },
    },
  };
};
