import { PropTypes } from 'react-view';
import {
  EuiPageTemplate,
  EuiPageContent,
  EuiPageHeader,
  EuiButton,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const pageContentBodyConfig = () => {
  const docgenInfo = Array.isArray(EuiPageContent.__docgenInfo)
    ? EuiPageContent.__docgenInfo[0]
    : EuiPageContent.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPageContent',
      props: propsToUse,
      scope: {
        EuiPageContent,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageContent'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};

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

  propsToUse.direction = {
    ...propsToUse.direction,
    value: 'row',
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

  propsToUse.fullHeight = {
    ...propsToUse.fullHeight,
    type: PropTypes.Boolean,
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
