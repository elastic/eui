import { PropTypes } from 'react-view';
import { EuiPage } from '../../../../../src';
import { propUtilityForPlayground } from '../../../services/playground';

export const pageConfig = () => {
  const docgenInfo = Array.isArray(EuiPage.__docgenInfo)
    ? EuiPage.__docgenInfo[0]
    : EuiPage.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.direction = {
    ...propsToUse.direction,
    value: 'row',
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPage',
      props: propsToUse,
      scope: {
        EuiPage,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPage'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};
