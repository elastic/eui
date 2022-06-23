import { PropTypes } from 'react-view';
import { EuiStat, COLORS } from '../../../../src/components/stat/stat';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiStat.__docgenInfo)
    ? EuiStat.__docgenInfo[0]
    : EuiStat.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Total people',
    type: PropTypes.String,
  };

  propsToUse.titleColor = {
    ...propsToUse.titleColor,
    options: COLORS.reduce((acc, color) => ({ ...acc, [color]: color }), {}),
    defaultValue: COLORS[0],
    type: PropTypes.Enum,
  };

  propsToUse.title = {
    ...propsToUse.title,
    value: '7,600 mm',
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiStat',
      props: propsToUse,
      scope: {
        EuiStat,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiStat'],
        },
      },
    },
  };
};
