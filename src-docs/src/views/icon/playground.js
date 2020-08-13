import {
  propUtilityForPlayground,
  dummyFunction,
  iconValidator,
  createOptionalEnum,
} from '../../services/playground';
import { PropTypes } from 'react-view';
import { EuiIcon } from '../../../../src/components/';

export default () => {
  const docgenInfo = Array.isArray(EuiIcon.__docgenInfo)
    ? EuiIcon.__docgenInfo[0]
    : EuiIcon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.type = iconValidator(propsToUse.iconType);

  propsToUse.size = createOptionalEnum(propsToUse.size);

  propsToUse.onIconLoad = {
    ...propsToUse.onIconLoad,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onIconLoad.custom,
      use: 'switch',
      label: 'Simulate',
    },
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
