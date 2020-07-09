import { EuiAvatar } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiAvatar.__docgenInfo)
    ? EuiAvatar.__docgenInfo[0]
    : EuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.name.value = 'Avatar';
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/g;

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    custom: {
      ...propsToUse.color.custom,
      validator: val => {
        return val.match(regex);
      },
    },
  };

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
