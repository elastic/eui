import { PropTypes } from 'react-view';
import { EuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiButton.__docgenInfo)
    ? EuiButton.__docgenInfo[0]
    : EuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.children = {
    value: 'Button',
    type: PropTypes.String,
    description: 'Visible label',
    hidden: false,
  };

  propsToUse.minWidth = {
    ...propsToUse.minWidth,
    type: PropTypes.Number,
  };

  propsToUse.color = {
    ...propsToUse.color,
    defaultValue: 'primary',
  };

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiButton',
      props: propsToUse,
      scope: {
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiButton'],
        },
      },
    },
    setGhostBackground,
  };
};
