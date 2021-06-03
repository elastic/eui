import {
  propUtilityForPlayground,
  dummyFunction,
  iconValidator,
} from '../../services/playground';
import { EuiIcon } from '../../../../src/components/';

export default () => {
  const docgenInfo = Array.isArray(EuiIcon.__docgenInfo)
    ? EuiIcon.__docgenInfo[0]
    : EuiIcon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.type = iconValidator({ ...propsToUse.type }, 'grid');

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  return {
    config: {
      componentName: 'EuiIcon',
      props: propsToUse,
      scope: {
        EuiIcon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiIcon'],
        },
      },

      customProps: {
        onIconLoad: dummyFunction,
      },
    },
  };
};
