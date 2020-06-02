import { PropTypes } from 'react-view';
import { EuiAvatar } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiAvatar.__docgenInfo)
    ? EuiAvatar.__docgenInfo[0]
    : EuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  console.log('propsToUse', propsToUse);
  propsToUse.name.value = 'Avatar';
  propsToUse.name.stateful = true;

  return {
    componentName: 'EuiAvatar',
    props: propsToUse,
    scope: {
      EuiAvatar,
    },
    imports: {
      '@elastic/eui': {
        named: ['EuiAvatar'],
      },
    },
  };
};
