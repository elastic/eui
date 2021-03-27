import { PropTypes } from 'react-view';
import { EuiBottomBar, EuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiBottomBar.__docgenInfo)
    ? EuiBottomBar.__docgenInfo[0]
    : EuiBottomBar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: '<EuiButton fill size="s">Save</EuiButton>',
    type: PropTypes.ReactNode,
    hidden: false,
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
      customProps: {
        onToggle: dummyFunction,
      },
    },
  };
};
