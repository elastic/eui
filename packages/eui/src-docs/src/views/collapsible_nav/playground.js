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

  propsToUse.ownFocus = {
    ...propsToUse.ownFocus,
    value: false,
    disabled: true,
  };

  propsToUse.size = {
    ...propsToUse.size,
    type: PropTypes.Number,
    value: 240,
  };

  propsToUse.as = {
    ...propsToUse.as,
    type: PropTypes.string,
    value: 'nav',
  };

  propsToUse.as = {
    ...propsToUse.as,
    type: PropTypes.string,
    value: 'nav',
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
