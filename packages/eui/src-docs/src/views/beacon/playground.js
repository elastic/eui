import { PropTypes } from 'react-view';
import { EuiBeacon } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const beaconConfig = () => {
  const docgenInfo = Array.isArray(EuiBeacon.__docgenInfo)
    ? EuiBeacon.__docgenInfo[0]
    : EuiBeacon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.size = {
    ...propsToUse.size,
    type: PropTypes.Number,
    defaultValue: 12,
  };

  return {
    config: {
      componentName: 'EuiBeacon',
      props: propsToUse,
      scope: {
        EuiBeacon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiBeacon'],
        },
      },
    },
  };
};
