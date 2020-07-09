import { EuiAvatar } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiAvatar.__docgenInfo)
    ? EuiAvatar.__docgenInfo[0]
    : EuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.name.value = 'Avatar';

  return {
    config: {
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
    },
  };
};
