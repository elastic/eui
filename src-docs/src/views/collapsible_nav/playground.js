import { PropTypes } from 'react-view';
import { EuiCollapsibleNav } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const collapsibleNavConfig = () => {
  const docgenInfo = Array.isArray(EuiCollapsibleNav.__docgenInfo)
    ? EuiCollapsibleNav.__docgenInfo[0]
    : EuiCollapsibleNav.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.isOpen = {
    ...propsToUse.isOpen,
    value: true,
  };

  propsToUse.useOverlayMask = {
    ...propsToUse.useOverlayMask,
    value: false,
    disabled: true,
  };

  propsToUse.width = {
    ...propsToUse.width,
    type: PropTypes.Number,
    value: 320,
  };

  return {
    config: {
      componentName: 'EuiCollapsibleNav',
      props: propsToUse,
      scope: {
        EuiCollapsibleNav,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCollapsibleNav'],
        },
      },
    },
  };
};
