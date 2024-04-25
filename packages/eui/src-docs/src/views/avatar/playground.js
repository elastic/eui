import { PropTypes } from 'react-view';
import { EuiAvatar, checkValidColor } from '../../../../src/components/avatar';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiAvatar.__docgenInfo)
    ? EuiAvatar.__docgenInfo[0]
    : EuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.name.value = 'Avatar';

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    custom: {
      ...propsToUse.color.custom,
      validator: (val) => {
        try {
          checkValidColor(val);
          return true;
        } catch (error) {
          return false;
        }
      },
    },
  };

  propsToUse.initialsLength = {
    ...propsToUse.initialsLength,
    type: PropTypes.Number,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

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
