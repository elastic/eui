import { PropTypes } from 'react-view';
import { EuiButton, EuiBottomBar } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const bottomBarConfig = () => {
  const docgenInfo = Array.isArray(EuiBottomBar.__docgenInfo)
    ? EuiBottomBar.__docgenInfo[0]
    : EuiBottomBar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: '<EuiButton color="ghost">Save</EuiButton>',
  };

  propsToUse.top = {
    ...propsToUse.top,
    type: PropTypes.Number,
  };

  propsToUse.right = {
    ...propsToUse.right,
    type: PropTypes.Number,
    value: '0',
  };

  propsToUse.bottom = {
    ...propsToUse.bottom,
    type: PropTypes.Number,
    value: '0',
  };

  propsToUse.left = {
    ...propsToUse.left,
    type: PropTypes.Number,
    value: '0',
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
