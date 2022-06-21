import {
  propUtilityForPlayground,
  dummyFunction,
  iconValidator,
} from '../../services/playground';
import { EuiIcon } from '../../../../src/components/';
import { IconProps } from './props';

export default () => {
  const docgenInfo = Array.isArray(IconProps.__docgenInfo)
    ? IconProps.__docgenInfo[0]
    : IconProps.__docgenInfo;

  const propsToUse = propUtilityForPlayground(docgenInfo.props, true);

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
