import { PropTypes } from 'react-view';
import { EuiStat } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiStat.__docgenInfo)
    ? EuiStat.__docgenInfo[0]
    : EuiStat.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.description.value = 'description';
  propsToUse.title.value = 'Title';

  return {
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
  };
};
