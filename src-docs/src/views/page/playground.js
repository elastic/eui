import { PropTypes } from 'react-view';
import {
  EuiPageTemplate,
  EuiPageHeader,
  EuiButton,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const pageTemplateConfig = () => {
  const docgenInfo = Array.isArray(EuiPageTemplate.__docgenInfo)
    ? EuiPageTemplate.__docgenInfo[0]
    : EuiPageTemplate.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  // TODO: Follow up on how to allow passing an object to a prop
  // propsToUse.pageHeader = simulateFunction({
  //   ...propsToUse.pageHeader,
  //   custom: {
  //     value: '{ pageTitle: "Page title" }',
  //   },
  // });

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.bottomBar = {
    ...propsToUse.bottomBar,
    type: PropTypes.String,
  };

  propsToUse.pageSideBar = {
    ...propsToUse.pageSideBar,
    value: 'Side bar',
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPageTemplate',
      props: propsToUse,
      scope: {
        EuiPageTemplate,
        EuiPageHeader,
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageTemplate', 'EuiPageHeader', 'EuiButton'],
        },
      },
      customProps: generateCustomProps(['pageHeader']),
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};
