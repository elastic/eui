import { PropTypes } from 'react-view';
import { EuiHealth } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiHealth.__docgenInfo)
    ? EuiHealth.__docgenInfo[0]
    : EuiHealth.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.color = {
    ...propsToUse.color,
    type: PropTypes.String,
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
