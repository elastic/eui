import { PropTypes } from 'react-view';
import { EuiStat } from '../../../../src/components/';
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
    options: {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      danger: 'danger',
      accent: 'accent',
      text: 'text',
    },
    defaultValue: 'text',
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
