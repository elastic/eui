import { PropTypes } from 'react-view';
import { EuiHealth } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiHealth.__docgenInfo)
    ? EuiHealth.__docgenInfo[0]
    : EuiHealth.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Status',
  };

  propsToUse.color = {
    ...propsToUse.color,
    options: {
      default: 'default',
      primary: 'primary',
      success: 'success',
      accent: 'accent',
      warning: 'warning',
      danger: 'danger',
      text: 'text',
      subdued: 'subdued',
      ghost: 'ghost',
    },
    type: PropTypes.Enum,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiHealth',
      props: propsToUse,
      scope: {
        EuiHealth,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiHealth'],
        },
      },
    },
    setGhostBackground,
  };
};
