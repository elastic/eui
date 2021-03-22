import { PropTypes } from 'react-view';
import { EuiButton, EuiBottomBar } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const bottomBarConfig = () => {
  const docgenInfo = Array.isArray(EuiBottomBar.__docgenInfo)
    ? EuiBottomBar.__docgenInfo[0]
    : EuiBottomBar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.String,
    value: '<EuiButton color="ghost">Save</EuiButton>',
    hidden: true,
  };

  return {
    config: {
      componentName: 'EuiBottomBar',
      props: propsToUse,
      scope: {
        EuiBottomBar,
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiBottomBar', 'EuiButton'],
        },
      },
    },
  };
};
